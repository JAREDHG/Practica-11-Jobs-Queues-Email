<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const props = defineProps(['pedidoId'])
const emailListo = ref(false)
let intervalo = null

onMounted(() => {
    const token = localStorage.getItem('token') 

    intervalo = setInterval(async () => {
        try {
            const { data } = await axios.get(`/api/pedidos/${props.pedidoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            emailListo.value = !!data.email_enviado_at
            
            if (emailListo.value) {
                clearInterval(intervalo)
            }
        } catch (error) {
            console.error("Error consultando estado:", error)
        }
    }, 3000)
})

onUnmounted(() => clearInterval(intervalo))
</script>

<template>
    <div class="estado-container">
        <div v-if='!emailListo' class='estado procesando'>
            Procesando tu pedido...
        </div>
        <div v-else class='estado listo'>
            ¡Pedido confirmado! Revisa tu correo.
        </div>
    </div>
</template>

<style scoped>
.estado {
    padding: 1rem;
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
}
.procesando { background-color: #fff3cd; color: #856404; }
.listo { background-color: #d4edda; color: #155724; }
</style>