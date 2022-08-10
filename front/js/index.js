const env = {
    "HOST": "",
    "USER_DATA": "udata"
}

const App = new Vue({
    el: '#app',
    data() {
        return {
            flg: false,
            num: "",
            user_data: {},
            nums: [],
            create_user_flg: false,//本当はfalse
            conf_user: false,//本当はfalse
            discord_id: "",
            create_user_msg: { "color": "", "text": "" },
            explain_flg: false,
            user_name: ""
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
        input_num: async function (key) {
            if (this.num.length < 7) {//入力が7文字未満なら
                this.num = this.num + String(key);//1文字追加
            } else if (this.num.length === 7) {//入力が七文字なら
                let time = await new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });
                this.num = await this.num + String(key);//ラスト一文字追加
                //this.user_data = await this.getUserData(this.num);//ユーザ問い合わせ．後々、エラー取得処理も加える
                //ここでifで登録処理を行う
                if (this.user_data === "user_not_found") {
                    this.create_user_flg = true;
                }
                //ここで通知処理を行う
                this.nums.push({ time: time, num: this.num });
                this.flg = false;//読み取りを終了する
                this.num = "";//numをリセットする
            }
        },

        start_input_num: function (key) {
            if (key === '%') {
                this.flg = true;
            }
        },

        getUserData: function (id) {
            //api作成後修正
            let params = { params: { id: id } };
            let url = env.HOST + env.USER_DATA;
            axios
                .get(url, params)
                .then(res => {
                    return res.data.code == 200 ? res.data.data : res.data.message;
                });
            //.catch()で通信エラー時の処理、.finally()で成功・失敗時共通の最終処理を書く
            //ユーザがいないときは"user_not_found"を返す
        },

        searchUser: async function () {
            if (await this.inputCheck()) {//入力フォームチェック
                //this.user_name = await this.getDiscordName(this.discord_id);//ユーザネーム取得
                this.createUserClose();//ユーザ登録画面を閉じる
                this.conf_user = true;//ユーザ確認画面を表示
            }
        },
        inputCheck: function () {
            //入力フォームの確認
            if (this.discord_id == "") {
                this.create_user_msg = { "color": "text-danger", "text": "＊idを入力してください。" };
                return false;
            } else if (!this.discord_id.match("#[0-9]{4}$")) {
                this.create_user_msg = { "color": "text-danger", "text": "＊idは数字4桁で入力してください。" };
                return false;
            } else {
                this.create_user_msg = { "color": "", "text": "ユーザ検索中..." };
                return true;
            }
        },

        getDiscordName: function (discord_id) {
            let params = { params: { id: id } };
            let url = env.HOST + env.DISCORD_NAME;
            axios
                .get(url, params)
                .then(res => {
                    return res.data.code == 200 ? res.data.data : res.data.message;
                });
        },
        createUser: function () {
            //apiを用いてユーザ登録

            this.conf_user = false;//ユーザ確認画面を閉じる

            //通知処理を行い、ログを表示
        },

        createUserClose: function () {
            //ユーザ登録画面を閉じて初期化する。
            this.create_user_flg = false;//ユーザ登録画面を閉じる
            this.create_user_msg = { "color": "", "text": "" };//ユーザ登録画面の初期化
            this.explain_flg = false;//ユーザ登録画面の初期化
        }
    },

});