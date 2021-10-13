import moment from "moment";

class Order {
  constructor(id, totalAmt, date, items) {
    this.id = id;
    this.totalAmt = totalAmt;
    this.date = date;
    this.items = items;
  }
  get readableDate() {
    return moment(this.date).format("Do MMM YYYY hh:mm");
  }
}

export default Order;
