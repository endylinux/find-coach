<template>
  <form @submit.prevent='submitForm'>
    <div class='form-control' :class='{invalid: !firstname.isValid}'>
      <label for='firstname'>Firstname</label>
      <input type='text' id='firstname' v-model.trim='firstname.val' @blur="clearValidity('firstname')" />
      <p v-if='!firstname.isValid'>Firstname must not be empty.</p>
    </div>
    <div class='form-control' :class='{invalid: !lastname.isValid}'>
      <label for='lastname'>Lastname</label>
      <input type='text' id='lastname' v-model.trim='lastname.val' @blur='clearValidity("lastname")' />
      <p v-if='!lastname.isValid'>Lastname must not be empty.</p>
    </div>
    <div class='form-control' :class='{invalid: !description.isValid}'>
      <label for='description'>Description</label>
      <textarea id='description' rows='5' v-model.trim='description.val' @blur='clearValidity("description")'></textarea>
      <p v-if='!description.isValid'>Description must not be empty.</p>
    </div>
    <div class='form-control' :class='{invalid: !rate.isValid}'>
      <label for='rate'>Hourly Rate</label>
      <input type='number' id='rate' v-model.number='rate.val' @blur="clearValidity('rate')" />
      <p v-if='!rate.isValid'>Rate must be greater than zero.</p>
    </div>
    <div class='form-control' :class='{invalid: !areas.isValid}'>
      <h3>Areas of Expertise</h3>
      <div>
        <input type='checkbox' id='frontend' value='frontend' v-model='areas.val' @blur='clearValidity("areas")' />
        <label for='frontend'>Frontend Development</label>
      </div>
      <div>
        <input type='checkbox' id='backend' value='backend' v-model='areas.val' @blur='clearValidity("areas")' />
        <label for='backend'>Backend Development</label>
      </div>
      <div>
        <input type='checkbox' id='career' value='career' v-model='areas.val' @blur='clearValidity("areas")' />
        <label for='career'>Career Development</label>
      </div>
      <p v-if='!areas.isValid'>At least one checkbox must be selected.</p>
    </div>
    <p v-if='!formIsValid'>Please fix the above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  name: 'CoachForm',
  data() {
    return {
      firstname: {
        val: '',
        isValid: true
      },
      lastname: {
        val: '',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      formIsValid: true,
    }
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if(this.firstname.val === '') {
        this.firstname.isValid = false;
        this.formIsValid = false;
      }
      if(this.lastname.val === '') {
        this.lastname.isValid = false;
        this.formIsValid = false;
      }
      if(this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if(!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if(this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if(!this.formIsValid) {
        return;
      }
      const formData = {
        first: this.firstname.val,
        last: this.lastname.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };

      this.$emit('save-data', formData);
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
