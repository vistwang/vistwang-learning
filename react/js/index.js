import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Dialog extends Component{
    constructor(props){
        super(props);
        this.state={
            second:0,
            items:[],
            text:''
        };

        this.handChange = this.handChange.bind(this);
        this.upData = this.upData.bind(this);
    }
    render(){
        return (
            <div>
                <h2>hello {this.props.name}</h2>
                <h3>second {this.state.second}</h3>
                <ToList items={this.state.items} />
                <form action="" onSubmit={this.upData}>
                    <input type="text"
                           onChange={this.handChange}
                           value={this.state.text}/>
                    <button>点我添加</button>
                    <div>{this.state.items.length}</div>
                </form>
            </div>
        )
    }

    upData(e){
        let pThis = this;
        e.preventDefault();
        const xx = {
            text: this.state.text,
            node:Date.now()
        }
        pThis.setState((preState) => (
            {
                items:preState.items.concat(xx),
                text:''
            }
        ))
    }

    handChange(e){
        let pThis = this;
        if(!e.target.value){
            return
        }
        pThis.setState({text:e.target.value});
    }

    tick(){
        this.setState((prevState) => ({second:prevState.second + 1}))
    }



    componentDidMount(){
        this.interval = setInterval(() => this.tick(),1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

}

class ToList extends Component{
    render(){
        return(
            <ul>
                {
                    this.props.items.map(v => (<li key={v.node}>{v.text}</li>))
                }
            </ul>

        )
    }
}


ReactDOM.render(
    <Dialog name="我是react" />,
    document.getElementById('root')
)