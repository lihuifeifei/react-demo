import React from "react"
import "./style.css"

class OrderItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            stars: props.data.stars || 0,
            comment: props.data.comment || "",
        };
        this.handleOpenEditArea = this.handleOpenEditArea.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleClickStars = this.handleClickStars.bind(this);
        this.handleCancelComment = this.handleCancelComment.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    handleOpenEditArea() {
        this.setState({
            editing: true,
        })
    }

    handleCommentChange(e) {
        this.setState({
            comment: e.target.value,
        })
    }

    handleClickStars(item) {
        this.setState({
            stars: item,
        })
    }

    handleCancelComment() {
        this.setState({
            editing: false,
            stars: this.props.data.stars || 0,
            comment: this.props.data.comment || "",
        })
    }

    handleSubmitComment() {
        const {id} = this.props.data;
        const {comment, stars} = this.state;
        this.setState({
            editing: false,
        })
        this.props.onSubmit(id, comment, stars)
    }

    render() {
        const {shop, product, price, picture, ifCommented} = this.props.data;
        return (
            <div className='orderItem'>
                <div className='orderItem__picContainer'>
                    <img className='orderItem__pic' src={picture}/>
                </div>
                <div className='orderItem__content'>
                    <div className='orderItem__product'>{product}</div>
                    <div className='orderItem__shop'>{shop}</div>
                    <div className='orderItem__detail'>
                        <div className='orderItem__price'>{price}</div>
                        <div>
                            {
                                ifCommented ? (<button className='orderItem__btn orderItem__btn--grey'>
                                        ?????????
                                    </button>
                                ) : (
                                    <button className='orderItem__btn orderItem__btn--red'
                                            onClick={this.handleOpenEditArea}>
                                        ??????
                                    </button>)
                            }
                        </div>
                    </div>
                </div>
                {this.state.editing ? this.renderEditArea() : ""}
            </div>
        )
    }

    renderEditArea() {
        return (
            <div className="orderItem__commentContainer">
                <textarea className="orderItem__comment"
                          onChange={this.handleCommentChange}
                          value={this.state.comment}/>
                {this.renderStars()}
                <button className="orderItem__btn orderItem__btn--red" onClick={this.handleSubmitComment}>??????</button>
                <button className="orderItem__btn orderItem__btn--grey" onClick={this.handleCancelComment}>??????</button>
            </div>
        )
    }

    renderStars() {
        const {stars} = this.state;
        return (
            <div>
                {[1, 2, 3, 4, 5].map((item, index) => {
                    const lightClass = stars >= item ?
                        "orderItem__star--light" : "";
                    return (
                        <span key={index} onClick={this.handleClickStars.bind(this, item)} className={"orderItem__star"+lightClass}>???</span>
                    )
                })}
            </div>
        )
    }
}

export default OrderItem;
