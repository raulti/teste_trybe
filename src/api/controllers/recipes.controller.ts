import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import AuthMiddleware from '../middleware/auth.middleware';
import recipeMiddleare from '../middleware/recipe.middleware';
import ValidationMiddleware from '../middleware/validation.middleware';
import RoleEnum from '../models/enum/role.enum';
import RecipeService from '../services/recipe.service';
import recipeMapper from './mapper/recipe.mapper ';
import { RecipesValidator } from './validator/recipes.validator';

const route = Router();

export default (app: Router) => {
  app.use('/recipes', route);

  const recipeService = new RecipeService();
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, `${Math.floor(Math.random() * 10)}.jpeg`);
    },
  });
  const upload = multer({ storage: storage });

  route.post(
    '/',
    AuthMiddleware,
    RecipesValidator.recipesSaveValidator(),
    ValidationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      recipeService
        .save(recipeMapper.recipeFromRequest(req))
        .then((response) => {
          res.status(201).json(recipeMapper.recipeResponse(response));
        })
        .catch((error) => {
          next(error);
        });
    },
  );

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    recipeService
      .findAll()
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        next(error);
      });
  });

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    recipeService
      .findById(recipeMapper.idParamToObjectId(req))
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        next(error);
      });
  });

  route.put(
    '/:id',
    recipeMiddleare(RoleEnum.ADMIN),
    AuthMiddleware,
    RecipesValidator.recipesSaveValidator(),
    ValidationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const recipe = recipeMapper.recipeFromRequest(req);
      recipe._id = recipeMapper.idParamToObjectId(req);

      recipeService
        .update(recipe)
        .then((response) => {
          res.json(response);
        })
        .catch((error) => {
          next(error);
        });
    },
  );

  route.delete(
    '/:id',
    recipeMiddleare(RoleEnum.ADMIN),
    AuthMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      await recipeService.delete(recipeMapper.idParamToObjectId(req));
      res.status(204).json();
    },
  );

  route.put(
    '/:id/image',
    recipeMiddleare(RoleEnum.ADMIN),
    AuthMiddleware,
    upload.single('image'),
    async (req: Request, res: Response, next: NextFunction) => {
      recipeService
        .saveImage(recipeMapper.idParamToObjectId(req), req.file)
        .then((response) => {
          res.json(response);
        })
        .catch((error) => {
          next(error);
        });
    },
  );

  route.get(
    '/images/:name',
    async (req: Request, res: Response, next: NextFunction) => {
      recipeService
        .getImage(req.params.name)
        .then((response) => {
          res.setHeader('Content-Type', 'iamge/jpeg');
          res.setHeader(
            'Content-Disposition',
            `attachment; filename=iamge.jpeg`,
          );
          res.json(response);
        })
        .catch((error) => {
          next(error);
        });
    },
  );
};
