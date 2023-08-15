/* eslint-disable */
import { expect } from "chai";
import {validate ,  validateAsync, validateWithThrow, validateWithLog } from "../email-validator.js";

describe("Email Validator", () => {
	

	describe("validate()", () => {
		it("should return true for valid email endings", () => {
			expect(validate("test@gmail.com")).to.be.true;
			expect(validate("user@outlook.com")).to.be.true;
			expect(validate("info@yandex.ru")).to.be.true;
		});

		it("should return false for invalid email endings", () => {
			expect(validate("invalid@example.com")).to.be.false;
			expect(validate("user@hotmail.com")).to.be.false;
		});
		it("should return false for invalid email endings", () => {
			expect(validate("test@hot.com")).to.be.false;
		});
	});

	describe("validateAsync()", () => {
		it("should return true asynchronously for valid email endings", () => {
			const result =  validateAsync("test@gmail.com");
			expect(result).to.be.true;
		});

		it("should return false asynchronously for invalid email endings",  () => {
			const result =  validateAsync("invalid@example.com");
			expect(result).to.be.false;
		});
	});

	describe("validateWithThrow()", () => {
		it("should return true for valid email endings", () => {
			expect(() => validateWithThrow("test@gmail.com")).not.to.throw();
		});

		it("should throw an error for invalid email endings", () => {
			expect(() => validateWithThrow("invalid@example.com")).to.throw("Invalid email");
		});
	});

	describe("validateWithLog()", () => {
		let originalConsoleLog;

		before(() => {
			originalConsoleLog = console.log;
			console.log = () => {}; // Replace console.log with a no-op function
		});

		after(() => {
			console.log = originalConsoleLog; // Restore console.log
		});

		it("should return true for valid email endings and log", () => {
			expect(validateWithLog("test@gmail.com")).to.be.true;
		});

		it("should return false for invalid email endings and log", () => {
			expect(validateWithLog("invalid@example.com")).to.be.false;
		});
	});
});
