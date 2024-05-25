import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/auth.js';

describe('Auth Middleware', () => {
    // Test case: Middleware trả về lỗi khi không có token được cung cấp
    it('should return an error if no token is provided', async () => {
        // Thiết lập request và response
        const req = { headers: {} };
        const res = {
            json: function (data) {
                expect(data.success).to.be.false;
                expect(data.message).to.equal('Not authorized login again');
            }
        };
        // next không được gọi trong trường hợp này, nên không cần mock
        const next = () => { };

        // Gọi authMiddleware với các đối số đã được thiết lập
        await authMiddleware(req, res, next);
    });

    // Test case: Middleware trả về lỗi khi token không hợp lệ
    it('should return an error if token is invalid', async () => {
        // Thiết lập request và response
        const req = { headers: { token: 'invalidToken' } };
        const res = {
            json: function (data) {
                expect(data.success).to.be.false;
                expect(data.message).to.equal('Error');
            }
        };
        // next không được gọi trong trường hợp này, nên không cần mock
        const next = () => { };

        // Gọi authMiddleware với các đối số đã được thiết lập
        await authMiddleware(req, res, next);
    });

    // Test case: Middleware đặt userId vào req.body nếu token hợp lệ
    it('should set userId in request body if token is valid', async () => {
        // Tạo một token hợp lệ
        const mockUserId = 'mockUserId';
        const mockToken = jwt.sign({ id: mockUserId }, process.env.JWT_SECRET);

        // Thiết lập request và response với token hợp lệ
        const req = { headers: { token: mockToken }, body: {} };
        const res = {};
        // next không được gọi trong trường hợp này, nên không cần mock
        const next = () => { };

        // Gọi authMiddleware với các đối số đã được thiết lập
        await authMiddleware(req, res, next);

        // Kiểm tra xem userId đã được đặt vào req.body hay không
        expect(req.body.userId).to.equal(mockUserId);
    });
});
