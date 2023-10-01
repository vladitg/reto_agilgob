<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Exception;

class TasksController extends Controller
{

    /**
     * Obtiene la lista de todas las tareas, de igual manera puede recibir los parametros de los filtros
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getAll(Request $request)
    {
        try {
            $data = $request->all();

            $query = Tasks::join('states', 'tasks.state_id', '=', 'states.id')
                        ->select('tasks.*', 'states.name AS state_name');
            if(!empty($data['title'])){
                $query->where('title', 'ilike', '%'.$data['title'].'%');
            }
            if(!empty($data['state_id'])){
                $query->where(['state_id' => $data['state_id']]);
            }
            $tasks =  $query->get();
            return response()->json(['tasks' => $tasks], 200);
        } catch (Exception $e) {
            return response()->json(['Error en la solicitud.', $e], 400);
        }
    }

    /**
     * Obtiene la tarea por su ID
     * @param  string $id
     * @return \Illuminate\Http\Response
     */
    public function getById(String $id)
    {
        try {
            $data = $request->all();
            $query = Tasks::join('states', 'tasks.state_id', '=', 'states.id')->select('tasks.*', 'states.name AS state_name')->where('tasks.id', $id)->fist();
            return response()->json(['task' => $tasks], 200);
        } catch (Exception $e) {
            return response()->json(['Error en la solicitud.', $e], 400);
        }
    }


    /**
     * Crea una nueva tarea
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $data = $request->json()->all();
            $task = new Tasks();
            $task->title = $request->title;
            $task->description = $request->description;
            $task->date_creation = $request->date_creation;
            $task->state_id = $request->state_id;
            $task->name_creator = $request->name_creator;
            $task->likes = $request->likes;

            $task->save();
            $task = Tasks::join('states', 'tasks.state_id', '=', 'states.id')
                        ->select('tasks.*', 'states.name AS state_name')->find($task->id);
            return response()->json(['message' => 'Registro generado.', 'task' => $task], 200);
        } catch (Exception $e) {
            return response()->json(['Error en la solicitud.', $e], 400);
        }
    }

    /**
     * Elimina el registro de tareas.
     * @param  string $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $id)
    {
        try {
            Tasks::where('id', $id)->delete();
            return response()->json(['message' => 'Registro eliminado.'], 200);
        } catch (Exception $e) {
            return response()->json(['Error en la solicitud.', $e], 400);
        }
    }

    /**
     * Registra cada uno de los likes
     * @param  string $id
     * @return \Illuminate\Http\Response
     */
    public function setLike(string $id)
    {
        try {
            $task = Tasks::find($id);
            Tasks::where("id", $id)->update(["likes" => $task->likes+1]);
            return response()->json(['message' => 'Registro actualizado.'], 200);
        } catch (Exception $e) {
            return response()->json(['Error en la solicitud.', $e->errorInfo[2]], 400);
        }
    }
}
