import React, { useEffect, useState } from 'react'
import useSocket from '../hooks/useSocket';
import {Chess} from 'chess.js';
import ChessBoard from '../components/ChessBoard';
const INIT_GAME="init_game";
const MOVE="move";
const GAME_OVER="game_over";

const Game = () => {
    console.log("first");
    const socket=useSocket();
    console.log("second");
    const [chess,setChess]=useState(new Chess());
    const [board,setBoard]=useState(chess.board());
    const [started,setStarted]=useState(false);
    

    useEffect(()=>{
        console.log("eere");
        console.log(chess);
        console.log(board);
        if(!socket)
        {
            return;
        }
        socket.onmessage=(event)=>{
             const message=JSON.parse(event.data);
             console.log(message);
             switch(message.type){
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true);
                    console.log("Game Initialized");
                    break;
                case MOVE:
                    const move=message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    break;
                case GAME_OVER:
                    setStarted(false);
                    console.log("Game over");
                    break;
             }
        }
    },[socket]);

    if(!socket){
        return <div>connecting....</div>
    }
      return (
        <div className="flex items-center justify-center h-full w-full bg-slate-900">
          <ChessBoard setBoard={setBoard} chess={chess} socket={socket} board={board}/>
          {!started && <button className='h-20 w-80 bg-green-500 text-white ml-14' onClick={()=>{
            socket.send(JSON.stringify({
                type:INIT_GAME
            }))
          }}>Play</button>
        }
        </div>
      );
    }
    
export default Game;
    