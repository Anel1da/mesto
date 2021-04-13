export default class UserInfo {
    constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
        this._userName = document.querySelector(userNameSelector)
        this._userJob = document.querySelector(userJobSelector)
        this._userAvattar = document.querySelector(userAvatarSelector)

    }

    getUserInfo() {
        const userInfo = {
            userName: this._userName.textContent,
            userJob: this._userJob.textContent
        }
        return userInfo
    }



    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.about
    }
}