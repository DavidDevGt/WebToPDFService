import express, { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import { generatePDF } from "../services/pdf";
import { optionsValidator } from "../validators/options";
import { urlValidator } from "../validators/url";

const router = express.Router();

/**
 * @openapi
 * /pdf:
 *   get:
 *     summary: Genera un PDF de una URL dada
 *     description: Valida la URL y opciones (como width y height) para generar un PDF de la página.
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: URL de la página a convertir en PDF.
 *       - in: query
 *         name: width
 *         required: false
 *         schema:
 *           type: number
 *         description: Ancho opcional para el PDF.
 *       - in: query
 *         name: height
 *         required: false
 *         schema:
 *           type: number
 *         description: Alto opcional para el PDF.
 *     responses:
 *       200:
 *         description: PDF generado correctamente.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Error en la solicitud, la URL o las opciones no son válidas.
 */
router.get(
  "/pdf",
  expressAsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsedUrl = urlValidator.safeParse(req.query);
      if (!parsedUrl.success) {
        res.status(400).json({ error: parsedUrl.error.errors[0].message });
        return;
      }

      let customOpts: { width?: number; height?: number } = {};
      if (
        req.query.width ||
        req.query.height ||
        req.query.expandScrolls ||
        req.query.customCss ||
        req.query.waitForSelectors
      ) {
        const optionsData = {
          options: {
            width: req.query.width ? parseInt(req.query.width as string, 10) : undefined,
            height: req.query.height ? parseInt(req.query.height as string, 10) : undefined,
            expandScrolls: req.query.expandScrolls ? req.query.expandScrolls === "true" : undefined,
            customCss: req.query.customCss ? (req.query.customCss as string) : undefined,
            waitForSelectors: req.query.waitForSelectors
              ? Array.isArray(req.query.waitForSelectors)
                ? req.query.waitForSelectors
                : [req.query.waitForSelectors as string]
              : undefined,
          },
        };

        const parsedOptions = optionsValidator.safeParse(optionsData);
        if (!parsedOptions.success) {
          res.status(400).json({ error: parsedOptions.error.errors[0].message });
          return;
        }
        customOpts = {
          width: parsedOptions.data.options.width,
          height: parsedOptions.data.options.height,
        };
      }

      const pdfBuffer = await generatePDF(parsedUrl.data.url, customOpts);

      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="pagina.pdf"',
      });
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  })
);

export default router;
