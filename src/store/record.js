import firebase from 'firebase/app'

export default {
    actions: {
        async createRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUserId');
                return await firebase.database().ref(`/user/${uid}/record`).push(record)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateRecord({dispatch, commit}, {amount, description, id}) {
            try {
                const uid = await dispatch('getUserId')
                await firebase.database().ref(`/user/${uid}/record`).child(id).update({amount, description})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecords({commit, dispatch}) {
            try {
                const uid = await dispatch('getUserId')
                const records = (await firebase.database().ref(`/user/${uid}/record`).once('value')).val() || {}
                return Object.keys(records).map(key => ({...records[key], id: key}))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecordDates({commit, dispatch}) {
            try {
                const uid = await dispatch('getUserId')
                const dates = (await firebase.database().ref(`/user/${uid}/record/date`).once('value')).val() || {}
                return Object.keys(dates).map(key => ({...dates[key], id: key}))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecordById({commit, dispatch}, id) {
            try {
                const uid = await dispatch('getUserId')
                const record = (await firebase.database().ref(`/user/${uid}/record`).child(id).once('value')).val() || {}
                return {...record, id}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}
