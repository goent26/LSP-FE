import api from './ApiClient'

const SkemaClient = {
    getAll: async (query = {}) => {
        const params = new URLSearchParams(query).toString()
        const res = await api.get(`/skema${params ? `?${params}` : ''}`)
        return res.data
    },

    getOneById: async (id) => {
        const res = await api.get(`/skema/${id}`)
        return res.data
    },

    createOne: async (payload) => {
        const res = await api.post('/skema', payload)
        return res.data
    },

    updateOneById: async (id, payload) => {
        const res = await api.put(`/skema/${id}`, payload)
        return res.data
    },

    deleteOneById: async (id) => {
        const res = await api.delete(`/skema/${id}`)
        return res.data
    },
}

export default SkemaClient
