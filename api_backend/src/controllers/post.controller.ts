/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola
 *   FILE:           users.controllers.ts
 *   DATE:           29/12/2021
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */
import { Request, Response } from "express";
import { exceptions } from "winston";
import bcrypt from "bcrypt";
var Post = require("../models/Post");

export const allPost = async (req: Request, res: Response) => {
  Post.find((err: any, users: any) => {
    if (err) {
      console.log(err);
      return res.status(404).send(err);
    } else {
      console.log(users);
      return res.status(200).send(users);
    }
  });
};

export const findPostById = (req: Request, res: Response) => {
  try {
    const post_id = req.params.postId;
    Post.findById(post_id, (err: any, post: any) => {
      if (err || !post) {
        res.status(404).send({ message: "Not found!" });
      } else {
        res.status(200).send(post);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addPost = (req: Request, res: Response) => {
  console.log(req.body)
  const post = new Post(req.body);
  post.save((err: any) => {
    if (err) {
      res.status(404).send({ message: "Error creating new Post!" });
    } else {
      res.status(201).send(post);
    }
  });
};

const saltRounds = 8;

export const updatePost = async (req: Request, res: Response) => {
  try {
    let post = new Post(req.body);
    post._id = req.params.postId;
    console.log(post);
    Post.findByIdAndUpdate(post._id, post, (err: any, userToUpdate: any) => {
      if (err || userToUpdate == undefined || !post._id) {
        res.status(404).send({ message: "Error with the request!" });
      } else {
        Post.findById(post._id, (err: any, userUpdated: any) => {
          if (err || userUpdated == undefined || !post._id) {
            res.status(404).send({ message: "Post to update not Found!" });
          } else {
            res.status(200).send(userUpdated);
          }
        });
      }
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

export const deletePost = (req: Request, res: Response) => {
  const post_id = req.params.postId;
  Post.deleteOne({ _id: post_id }, (err: any) => {
    if (err || post_id == undefined) {
      res.status(404).send({ message: "Post to delete not Found!" });
    } else {
      res.status(200).send(`DELETE request for id ${post_id}`);
    }
  });
};

export const findPostByTitle = (req: Request, res: Response) => {
  Post.findOne(
    { title: new RegExp("^" + name + "$", "i") },
    function (err, user) {
      if (err) {
        res.status(404).send({ message: "Post not Found!" });
      } else {
        res.status(200).send(user);
      }
    }
  );
};
