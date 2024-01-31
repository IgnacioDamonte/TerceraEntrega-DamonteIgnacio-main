export default class UsersSendDTO {
  constructor(user) {
    this.name = user?.first_name || ""
    this.email = user?.email || ""
    this.age = user?.age || 0
    this.cart = user?.cart || {}
    this.role = user?.role || "user"
  }
}