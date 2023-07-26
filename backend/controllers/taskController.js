import { TaskModel } from "../models/Task.js";

export const taskController = {
    //GET TASK
  getAll: async (req, res) => {
    try {
      const task = await TaskModel.find();
      res.status(200).json({
        data: task,
        success: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //ADD TASK
  getOne: async (req, res) => {
    try {
      const task = await TaskModel.findOne({ _id: req.params.id });
      res.status(200).json({
        data: task,
        success: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    try {
      const task = await new TaskModel({
        project_name: req.body.project_name,
        task_name: req.body.task_name,
        description: req.body.description,
        assigned_to: req.body.assigned_to,
        priority: req.body.priority,
      });
      const result = await task.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const result = await TaskModel.updateOne(
        { _id: req.params.id },
        {
          project_name: req.body.project_name,
          task_name: req.body.task_name,
          description: req.body.description,
          assigned_to: req.body.assigned_to,
          priority: req.body.priority,
        }
      );
      res.status(200).json({ message: "success", data: result });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    TaskModel.findByIdAndRemove(req.params.id)
    .then(data=>{
      if(data){
        res.status(200).json({
          message: 'Project deleted successfully',
          data:data
        });
      }else{
        res.status(403).json({
          message: 'Project deleted failed',
        });
      }
    })
    .catch((err)=>{
      res.status(500).json(err)
    })
  },
};
