import express from 'express';
import cors from 'cors';

export const configureApp = (app) => {
  app.use(cors());
  app.use(express.json());
};
