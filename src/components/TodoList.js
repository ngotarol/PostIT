import React, { Fragment, useRef, useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { v4 as uuid } from "uuid";

export function TodoList() {
    const [tareas, setTareas] = useState([]);
    const titulo = useRef();
    const important = useRef();
    const detalle = useRef();
    const KEY = "todolist-tareas";
    useEffect(() => {
        const tareasStorage = JSON.parse(localStorage.getItem(KEY));
        console.log(tareasStorage);
        setTareas((tareasAnteriores) => {
            return [...tareasAnteriores, ...tareasStorage];
        });
    }, []);
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(tareas));
    }, [tareas]);
    function eliminarTarea(id) {
        console.log(id);
        setTareas((tareasAnteriores) => {
            return tareasAnteriores.filter((item) => item.id !== id);
        });
    }
    function agregarTarea() {
        const tittle = titulo.current.value;
        const value = detalle.current.value;
        const isImportant = important.current.checked;
        if (value === '') return;
        const nuevaTarea = {
            id: uuid(),
            important: isImportant,
            valor: value,
            titulo: tittle
        }
        setTareas((tareasAnteriores) => {
            return [...tareasAnteriores, nuevaTarea];
        });
        titulo.current.value = '';
        detalle.current.value = '';
        important.current.checked = false;
    }

    return (
        <Fragment>
            <div className="row">
                <h1>Post it!</h1>
            </div>
            <div className="row align-items-center">
                <div className="col-md-2">
                    <textarea className="form-control green-border-focus" id="titulo" rows={3} ref={titulo} type="text" placeholder="Ingrese un titulo" />
                </div>
                <div className="col-md-6">
                    <textarea className="form-control green-border-focus" id="detalle" rows={3} ref={detalle} placeholder="Ingrese el detalle de la tarea" />
                </div>
                <div className="col-md-1">
                    <p className="m-2">Importante  <input ref={important} type="checkbox" id="important" /> </p>
                </div>
                <div className="col-md-3">
                    <button onClick={agregarTarea} className="btn btn-light btn-lg p-4 m-2">Agregar</button>
                </div>

            </div>
            <div className="row">
                <ul>
                    {tareas.map((item, i) => {
                        return  <TodoItem
                                key={i}
                                id={item.id}
                                titulo={item.titulo}
                                detalle={item.valor}
                                important={item.important}
                                eliminarCallback={eliminarTarea}
                                >                            
                            </TodoItem>
                    }
                    )}
                </ul>
            </div>
        </Fragment>
    );
}
