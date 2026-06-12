import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useFiltros() {
  const route  = useRoute()
  const router = useRouter()

  // Inicializar filtros desde la URL
  const filtros = reactive({
    busqueda:     route.query.busqueda  || '',
    categoria_id: route.query.categoria || '',
    precio_min:   route.query.min       || '',
    precio_max:   route.query.max       || '',
    pagina:       Number(route.query.p) || 1,
  })

  // Sincronizar cambios en filtros → URL
  watch(filtros, () => {
    router.push({ query: {
      busqueda:  filtros.busqueda     || undefined,
      categoria: filtros.categoria_id || undefined,
      min:       filtros.precio_min   || undefined,
      max:       filtros.precio_max   || undefined,
      p:         filtros.pagina > 1   ? filtros.pagina : undefined,
    }})
  }, { deep: true })

  return { filtros }
}