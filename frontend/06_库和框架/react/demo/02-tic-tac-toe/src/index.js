

    import React, { Component } from 'react';
    import { render } from 'react-dom';

    import './index.css';

    function Square(props) {
        return (
            <button className="square" onClick={() => props.onClick()}>
                {props.value}
            </button>
        );
    }


    /**
     * @props object -
     * @props.onClick function -
     * @props.squares array - 展示数据
     * */
    class Board extends Component {
        renderSquare(i) {
            const squares = this.props.squares;
            return <Square value={squares[i]} onClick={() => this.props.onClick(i)} />;
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

    class Game extends Component {
        constructor() {
            super();
            this.state = {
                history: [{
                    squares: Array(9).fill(null),
                }],
                stepNumber: 0,
                xIsNext: true,
            };
        }
        handleClick(i) {
            var history = this.state.history.slice(0, this.state.stepNumber + 1);
            var current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
                return;
            }

            squares[i] = this.state.xIsNext ? 'X' : 'O';

            this.setState({
                history: history.concat([{
                    squares: squares
                }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
            });
        }
        jumpTo(step) {
            let history = this.state.history;

            if (!step) {
                history = [{
                    squares: Array(9).fill(null)
                }];
            }

            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) ? false : true,
                history: history
            });
        }
        render() {
            const history = this.state.history;
            const stepNumber = this.state.stepNumber;
            const current = history[stepNumber];

            const winner = calculateWinner(current.squares);
            let status;
            if (winner) {
                status = 'Winner: ' + winner;
            } else {
                if (stepNumber === 9) {
                    status = '平局';
                } else {
                    status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
                }
            }

            const moves = history.map((step, move) => {
                const desc = move ?
                'Move #' + move :
                    'Game start';
                return (
                    <li key={move}>
                        <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                    </li>
                );
            });

            return (
                <div className="game">
                    <div>
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                            />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            );
        }
    }

    // ========================================

    render(
        <Game />,
        document.getElementById('root')
    );

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
