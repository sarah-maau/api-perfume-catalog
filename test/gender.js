const { expect } = require('chai');

const { genderSchema } = require('../app/schemas/modelSchemas');

let mockGender;

describe('Gender schema', function() {

    before(function() {
        // l'objet à valider
        mockGender = {
            type: "Fille",
        };
    });

    it('should validate a valid Gender', function() {

        expect(genderSchema.validate(mockGender)).not.to.have.property('error');

    });

    it('should not validate a Gender with a name less than 5 characters long', function() {

        mockGender.type = "Gars";

        const validation = genderSchema.validate(mockGender);

        expect(validation).to.have.property('error'); 
        expect(validation.error.details[0].path[0]).to.equal('type');
    });


    it('should not validate a Gender with an empty type', function() {

        mockGender.type = " ";

        const validation1 = genderSchema.validate(mockGender);

        expect(validation1).to.have.property('error'); 
        expect(validation1.error.details[0].path[0]).to.equal('type');
    });

});