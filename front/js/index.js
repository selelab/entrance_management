const App = new Vue({
    el: '#app',
    data() {
        return {
            flg: false,
            num: "",
            nums: []
        }
    },
    mounted() {
        document.addEventListener('keydown', this.keypress_event)
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.keypress_event)
    },
    methods: {
        keypress_event: function (e) {
            if (!this.flg) {//flgがfalseならば
                this.start_input_num(e.key);//「％」が入力されたらflgをtrueに(読み取り開始)
            } else {//flgがtrueならば
                this.input_num(e.key);//numに学生番号を格納
            }
            return false;
        },
        input_num: function (key) {
            if (this.num.length < 7) {//入力が7文字未満なら
                this.num = this.num + String(key);//1文字追加
            } else if (this.num.length === 7) {//入力が七文字なら
                let time = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });
                this.num = this.num + String(key);//ラスト一文字追加
                this.nums.push({ time: time, num: this.num });
                /*
                
                let text_color = "#00ff00";
                let status = "INFO";
                let log = `<p class="mx-3" style="color:${text_color}">${new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })} [${status}]    :${num} さん入室</p>`;
                document.getElementById('console').insertAdjacentHTML('beforeend', log);//ログ表示
                */
                this.flg = false;//読み取りを終了する
                this.num = "";//numをリセットする
            }
        },

        start_input_num: function (key) {
            if (key === '%') {
                this.flg = true;
            }
        }
    },

});