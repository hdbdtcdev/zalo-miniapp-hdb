export interface ValidationResult {
    isInvalid?: boolean;
    isEmpty?: boolean;
    errors?: string;
}

export class validator {
    static validatePhoneNumber(phoneNumber: string): ValidationResult {
        if (!phoneNumber) {
            return {
                isEmpty: true,
                errors: 'PhoneNumber_is_required',
            };
        }
        const phonePattern = /^(0)(3[2-9]|5[25689]|7[06-9]|8[1-9]|9[0-9])\d{7}$/;
        const isInvalid = !phonePattern.test(phoneNumber);
        return {
            isInvalid,
            errors: isInvalid ? 'PhoneNumber_is_invalid' : undefined,
        };
    }

    static validateEmail(email: string): ValidationResult {
        if (!email) {
            return {
                isEmpty: true,
                errors: 'Email_is_required',
            };
        }
        const emailPattern = /^[a-zA-Z0-9_.]{1,64}@[a-zA-Z0-9]{2,}\.([a-zA-Z0-9]{2,4}|[a-zA-Z0-9]{2,4}\.[a-zA-Z0-9]{2,4})$/u;
        const isInvalid = !emailPattern.test(email);

        return {
            isInvalid,
            errors: isInvalid ? 'Email_is_invalid' : undefined,
        };
    }

    static validateCurrency(amount: string, min: number | null, max: number | null): ValidationResult {
        amount = amount.replace(/,/g, '').trim();
        if (!amount) {
            return {
                isEmpty: true,
                errors: 'Amount_is_required',
            };
        }
        const currencyPattern = /^[1-9][0-9]*$/;
        const isInvalid = !currencyPattern.test(amount);
        if (min && max && (Number(amount) < min || Number(amount) > max)) {
            return {
                isInvalid: true,
                errors: 'Amount_is_out_of_range',
            };
        }
        return {
            isInvalid,
            errors: isInvalid ? 'Amount_is_invalid' : undefined,
        };
    }

    static validateFullName(fullName: string): ValidationResult {
        if (!fullName) {
            return {
                isEmpty: true,
                errors: 'Name_is_required',
            };
        }
        const fullNamePattern =
            /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s]+$/u;
        const isInvalid = !fullNamePattern.test(fullName);

        return {
            isInvalid,
            errors: isInvalid ? 'Name_is_invalid' : undefined,
        };
    }
    static validateBirthDate(birthDate: string): ValidationResult {
        if (!birthDate) {
            return {
                isEmpty: true,
                errors: 'BirthDate_is_required',
            };
        }
        if (birthDate.length !== 10) {
            return {
                isInvalid: true,
                errors: 'BirthDate_is_invalid',
            };
        }
        return {
            isEmpty: false,
            errors: '',
        };
    }
    static validateHDCode(HDCode: string): ValidationResult {
        if (!HDCode) {
            return {
                isEmpty: true,
                errors: 'HDCode_is_required',
            };
        }
        return {
            isEmpty: false,
            errors: undefined,
        };
    }
    static validateReferralCode(code: string): ValidationResult {
        if (!code) {
            return {
                isEmpty: true,
                errors: 'referralCode_is_required',
            };
        }
        const phonePattern = /^(0)(3[2-9]|5[25689]|7[06-9]|8[1-9]|9[0-9])\d{7}$/;
        const isInvalid = !phonePattern.test(code);
        if (isInvalid) {
            return {
                isInvalid,
                errors: 'referralCode_is_invalid',
            };
        }
        return {
            isEmpty: false,
            errors: undefined,
        };
    }
    static validateCreditLimit(value: string, limit: number): ValidationResult {
        if (!value) {
            return {
                isEmpty: true,
                errors: 'credit_litmit_err',
            };
        }
        let isInvalid = false;
        if (Number(value.trim().replace(',', '')) > limit) {
            isInvalid = true;
            return {
                isInvalid,
                errors: 'credit_litmit_err',
            };
        }
        return {
            isEmpty: false,
            errors: undefined,
        };
    }
    static validateIncome(income: string): ValidationResult {
        if (!income) {
            return {
                isEmpty: true,
                errors: 'income_is_required',
            };
        }
        let isInvalid = false;
        const value = Number(income.replace(',', ''));
        if (value < 5000000) {
            isInvalid = true;
            return {
                isInvalid,
                errors: 'income_err_min',
            };
        }

        if (value > 999000000) {
            isInvalid = true;
            return {
                isInvalid,
                errors: 'income_err_max',
            };
        }
        return {
            isEmpty: false,
            errors: undefined,
        };
    }
    static validateGlobalId(globalId: string): ValidationResult {
        // Check if empty
        if (!globalId) {
            return {
                isEmpty: true,
                errors: 'GlobalId_is_required',
            };
        }

        const regex = /^\d{12}$/;
        const isInvalid = !regex.test(globalId);

        return {
            isInvalid,
            errors: isInvalid ? 'GlobalId_is_invalid' : undefined,
        };
    }
    static validateOldGlobalId(globalId: string): ValidationResult {
        // Check if empty
        if (!globalId) {
            return {
                isEmpty: true,
                errors: 'GlobalId_is_required',
            };
        }

        const regex = /^\d{9}$/;
        const isInvalid = !regex.test(globalId);

        return {
            isInvalid,
            errors: isInvalid ? 'GlobalId_is_invalid' : undefined,
        };
    }
    static validateAddress(text: string): ValidationResult {
        if (!text) {
            return {
                isEmpty: true,
                errors: 'Address_is_required',
            };
        }
        return {
            isEmpty: false,
            errors: undefined,
        };
    }
}
