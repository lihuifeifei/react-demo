import React, {Component} from 'react';
import OrderItem from "../OrderItem";


class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                id: 1,
                shop: "京东超市",
                picture: "",
                product: "瓜子一包",
                price: "5",
                ifCommented: false
            },
                {
                    id: 2,
                    shop: "天猫超市",
                    picture: "",
                    product: "袜子一双",
                    price: "10",
                    ifCommented: true
                }, {
                    id: 3,
                    shop: "红旗连锁",
                    picture: "",
                    product: "矿泉水",
                    price: "2",
                    ifCommented: false
                }]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(id, comment, stars) {
        const newData = this.state.data.map(item => {
            return item.id === id ?
                {
                    ...item, comment, stars, ifCommented: true
                } : item
        })
        this.setState({
            data: newData
        })
    }

    componentWillUnmount() {
        fetch('/mock/orders.json').then(res => {
            if (res.ok) {
                res.json().then(data => {
                    this.setState({data})
                })
            }
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.data.map(item => {
                        return <OrderItem key={item.id} data={item} onSubmit={this.handleSubmit}/>
                    })
                }
            </div>
        );
    }
}

export default OrderList;
