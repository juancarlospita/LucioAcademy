import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import LayoutModel from "../models/layout.model";
import cloudinary from "cloudinary";
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await LayoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`${type} already exist`, 400));
      }
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        // upload immage on cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        // get banner
        const banner = {
          type: "Banner",
          banner: {
            image: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            title,
            subTitle,
          },
        };
        // create banner documnent
        await LayoutModel.create(banner);
      }
      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return { question: item.question, answer: item.answer };
          })
        );
        await LayoutModel.create({ type: "FAQ", faq: faqItems });
      }
      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return { title: item.title };
          })
        );
        await LayoutModel.create({
          type: "Categories",
          categories: categoriesItems,
        });
      }
      // send response
      res.status(200).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// edit layout feature
export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        
        // Buscar el banner existente
        const bannerData = await LayoutModel.findOne({ type: "Banner" });
        
        if (!bannerData) {
          return next(new ErrorHandler("Banner not found", 404));
        }

        // Si hay una nueva imagen, eliminar la anterior y subir la nueva
        if (image && !image.startsWith("https")) {
          // Eliminar imagen anterior
          if (bannerData.banner?.image?.public_id) {
            await cloudinary.v2.uploader.destroy(bannerData.banner.image.public_id);
          }

          // Subir nueva imagen
          const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "layout",
          });

          // Actualizar banner con nueva imagen
          await LayoutModel.findByIdAndUpdate(
            bannerData._id,
            {
              banner: {
                image: {
                  public_id: myCloud.public_id,
                  url: myCloud.secure_url,
                },
                title,
                subTitle,
              },
            },
            { new: true }
          );
        } else {
          // Solo actualizar texto manteniendo la imagen existente
          await LayoutModel.findByIdAndUpdate(
            bannerData._id,
            {
              banner: {
                image: bannerData.banner.image,
                title,
                subTitle,
              },
            },
            { new: true }
          );
        }
      }
      if (type === "FAQ") {
        const { faq } = req.body;
        // ones we have in our db
        const FaqItems = await LayoutModel.findOne({ type: "FAQ" });
        // ones we update
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        // update
        await LayoutModel.findByIdAndUpdate(FaqItems?._id, {
          type: "FAQ",
          faq: faqItems,
        });
      }
      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesData = await LayoutModel.findOne({
          type: "Categories",
        });
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(categoriesData?._id, {
          type: "Categories",
          categories: categoriesItems,
        });
      }
      res.status(200).json({
        success: true,
        message: "Layout updated successfully!",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// get layout for all users
export const getLayoutByType = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;
      const layout = await LayoutModel.findOne({ type });
      if (!layout) {
        return next(new ErrorHandler("Invalid type", 400));
      }
      res.status(201).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
