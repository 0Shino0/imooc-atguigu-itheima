export default {
  computed: {
    filterTime() {
      return this.timeFilter(this.time)
    },
    filterDate() {
      return this.dateFilter(this.time)
    }
  },
  data() {
    return {
      time: new Date()
    }
  },
  methods: {
    dateFilter(v) {
      let m = v.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = v.getDate()
      d = d < 10 ? '0' + d : d
      return v.getFullYear() + '-' + m + '-' + d
    },
    timeFilter(v) {
      let h = v.getHours()
      h = h < 10 ? '0' + h : h
      let m = v.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = v.getSeconds()
      s = s < 10 ? '0' + s : s
      return h + ':' + m + ':' + s
    }
  },
  created() {
    setInterval(() => {
      this.time = new Date()
    }, 1000)
  }
}
