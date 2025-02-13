import { Request, Response, Router } from "express";

/**
 * @openapi
 * /:
 *   get:
 *     summary: Health check
 *     description: Endpoint para verificar que el servidor está funcionando.
 *     responses:
 *       200:
 *         description: Respuesta exitosa que confirma que el servidor está activo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All good!"
 */
const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.status(200).json({ message: "All good!" });
});

export default router;
