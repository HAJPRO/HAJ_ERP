const ReportService = require("../../services/Report/report.service")
class ReportController {
    async Generate(req, res, next) {
        try {
            const all = await ReportService.generate(req.body.status);
            res.status(200).json(all);
        } catch (error) {
            next(error);
        }
    }
    async Get(req, res, next) {
        try {
            const all = await ReportService.get();
            res.status(200).json(all);
        } catch (error) {
            next(error);
        }
    }
}


module.exports = new ReportController();
