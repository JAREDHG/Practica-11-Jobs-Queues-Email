<template>
  <div class="card shadow-sm border-0 mb-4">
    <div class="card-body p-4">
      <h4 class="mb-3 fw-bold text-dark">{{ productoEditar ? 'Editar Producto' : 'Nuevo Producto' }}</h4>
      
      <form @submit.prevent="guardar" class="row g-3">
        <InputField 
          label="Nombre del producto"
          v-model="nombre"
          :error="errors.nombre || erroresServidor.nombre?.[0]"
        />

        <InputField 
          label="Precio"
          v-model="precio"
          type="number"
          :error="errors.precio || erroresServidor.precio?.[0]"
        />

        <InputField 
          label="Stock"
          v-model="stock"
          type="number"
          :error="errors.stock || erroresServidor.stock?.[0]"
        />

        <div class="col-12">
          <label class="form-label fw-bold">Descripción:</label>
          <textarea v-model="descripcion" class="form-control" rows="2"></textarea>
          <span class="text-danger small" v-if="errors.descripcion">{{ errors.descripcion }}</span>
        </div>

        <div class="col-12 mt-3">
          <button type="submit" class="btn btn-primary px-4" :disabled="cargando">
            {{ cargando ? 'Procesando...' : (productoEditar ? 'Actualizar' : 'Guardar') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import { productoSchema } from '@/schemas/productoSchema'
import { createProducto, updateProducto } from '../services/productoService'
import InputField from './InputField.vue'

const props = defineProps({ productoEditar: { type: Object, default: null } })
const emit = defineEmits(['recargar', 'limpiar-edicion'])

// Configuración de VeeValidate
const { handleSubmit, errors, resetForm, setValues } = useForm({
  validationSchema: productoSchema
})

const { value: nombre } = useField('nombre')
const { value: precio } = useField('precio')
const { value: stock } = useField('stock')
const { value: descripcion } = useField('descripcion')

const erroresServidor = ref({})
const cargando = ref(false)

// Sincronizar datos si es edición
watch(() => props.productoEditar, (nuevo) => {
  if (nuevo) setValues(nuevo)
  else resetForm()
}, { immediate: true })

const guardar = handleSubmit(async (values) => {
  cargando.value = true
  erroresServidor.value = {}

  try {
    if (props.productoEditar) {
      await updateProducto(props.productoEditar.id, values)
    } else {
      await createProducto(values)
    }
    emit('recargar')
    resetForm()
  } catch (error) {
    if (error.response?.status === 422) {
      erroresServidor.value = error.response.data.errors
    }
  } finally {
    cargando.value = false
  }
})
</script>