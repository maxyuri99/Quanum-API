import { Request, Response } from "express";
import ResponseFormat from "../../interfaces/ResponseFormat";
import { GetUsersOfAuditService } from "../../services/Audit/GetUsersOfAuditService";

export class GetUsersOfAuditController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      const { auditId } = req.params;
      if (!auditId) throw new Error('"audit_id" was not provided.');
      const service = new GetUsersOfAuditService();
      const users = await service.execute(auditId);
      response = {
        success: true,
        data: users,
        message: "Usuários listados com sucesso!",
      };
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      return res.json(response);
    }
  }
}
