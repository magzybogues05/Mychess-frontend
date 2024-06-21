import React, { useState } from 'react';
import k from "../assets/images/k.png";
import b from "../assets/images/b.png";
import n from "../assets/images/n.png";
import p from "../assets/images/p.png";
import q from "../assets/images/q.png";
import r from "../assets/images/r.png";
import K_copy from "../assets/images/K_copy.png";
import B_copy from "../assets/images/B_copy.png";
import N_copy from "../assets/images/N_copy.png";
import P_copy from "../assets/images/P_copy.png";
import Q_copy from "../assets/images/Q_copy.png";
import R_copy from "../assets/images/R_copy.png";

const images = {
    k: k,
    b: b,
    n: n,
    p: p,
    q: q,
    r: r,
    K_copy: K_copy,
    B_copy: B_copy,
    N_copy: N_copy,
    P_copy: P_copy,
    Q_copy: Q_copy,
    R_copy: R_copy,
  };
const MOVE="move"; 

const ChessBoard = ({chess,setBoard,board,socket}) => {

    const [from,setFrom]=useState(null);

  return <div className="text-white-200">
    {board.map((row,i)=>{
        return <div key={i} className='flex'>
            {
                row.map((square,j)=>{

                    const squareRepresentation= String.fromCharCode(97+(j%8))+""+(8-i);
                    return <div onClick={()=>{
                        if(!from)
                        {
                            setFrom(squareRepresentation);
                        }
                        else{
                            // setTo(square?.square ?? null);
                            socket.send(JSON.stringify({
                                type:MOVE,
                                payload:{
                                    move:{
                                    from,
                                    to:squareRepresentation
                                    }
                                }
                            }))
                            chess.move({
                                from,
                                to:squareRepresentation
                            });
                            setBoard(chess.board());
                            setFrom(null);
                            console.log({
                                from,
                                to:squareRepresentation
                            });
                        }
                    }} key={j} className={`w-14 h-14 ${(i+j)%2===1 ?'bg-green-500':'bg-white'}`}>
                        <div className='w-full justify-center flex h-full'>
                        <div className='h-full justify-center flex flex-col'>
                        {square ? <img className='w-13' src={images[(square?.color === 'b' ?
                        square?.type : `${square?.type?.toUpperCase()}_copy`)]}/>:null}
                        </div>
                        </div>
                        </div>
                })}
            </div>
    })}</div>;
};

export default ChessBoard;
