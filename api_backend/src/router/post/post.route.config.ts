/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola
 *   FILE:           post.route.config.js
 *   DATE:           05/10/2023
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */
import { CommonRoutesConfig } from "../common.routes.config";
import express from "express";
import { allPost,findPostById,addPost,updatePost,deletePost,findPostByTitle } from "../../controllers/post.controller";
import { auth } from "../../middlewares/auth.middlewares";

export class PostRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "PostRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/post`)
      .get(auth, (req: express.Request, res: express.Response) => {
        allPost(req, res);
      })
      .post((req: express.Request, res: express.Response) => {
        addPost(req, res);
      });

    this.app
      .route(`/post/:postId`)
      .all(
        auth,
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          next();
        }
      )
      .get(auth, (req: express.Request, res: express.Response) => {
        findPostById(req, res); 
      })
      .put(auth, (req: express.Request, res: express.Response) => {
        updatePost(req, res); 
      })
      .patch(auth, (req: express.Request, res: express.Response) => {
        updatePost(req, res); 
      })
      .delete(auth, (req: express.Request, res: express.Response) => {
        deletePost(req, res);
      });

    return this.app;
  }
}
