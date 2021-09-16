import { ToyReact, Component } from './ToyReact';

// html 标签
const htmlElement = (
    <div className="my-box">
        <span>Hello, </span>
        <span>World! </span>
        I am Jay...
    </div>
);

// React 函数组件
function Hello(props = {}) {
    return <h1>Hello, {props.name}</h1>;
}

// React class 组件
class MyBox extends Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        console.log('MyBox.handleClick');
    }

    render() {
        return (
            <div class={this.props.className} onClick={this.handleClick}>
                <Hello name="Jay" />
                <span>JJJJ</span>
                {this.children}
            </div>
        );
    }
}

const reactElement = (
    <MyBox className="my-box2">
        <span>I</span>
        <span>am</span>
        <span>my-box2</span>
    </MyBox>
)

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
      }
    render() {
        return (
            <button className="square" onClick={() => this.setState({ value: 'X' })}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends Component {
    renderSquare(i) {
        return (
            <Square
                value={i}
                onClick={function() { alert('click2'); }}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

// 渲染
ToyReact.render(
    <Board />,
    document.getElementById('app'),
    () => {
        console.log("ToyReact.render() Done!");
    }
);