<template>
  <div class="col-md-6 mb-3">
    <label class="form-label fw-bold">{{ label }}</label>
    
    <input 
      :type="type" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control"
      :class="{ 'is-invalid': error }"
    />
    
    <div class="invalid-feedback" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: [String, Number],
  error: String,
  type: { type: String, default: 'text' }
})

defineEmits(['update:modelValue'])
</script>