const { expect } = require('chai');

const { scentSchema } = require('../app/schemas/modelSchemas');

let mockScent;

describe('Scent schema', function() {

    before(function() {
        //  l'objet à valider
        mockScent = {
            note: "Kiwi",
        };
    });

    it('should validate a valid Scent', function() {

        expect(scentSchema.validate(mockScent)).not.to.have.property('error');

    });

    it('should not validate a Scent with a note less than 2 characters long', function() {

        mockScent.note = "A";

        const validation = scentSchema.validate(mockScent);

        expect(validation).to.have.property('error'); 
        expect(validation.error.details[0].path[0]).to.equal('note');
    });


    it('should not validate a Scent with an empty note', function() {

        mockScent.type = " ";

        const validation1 = scentSchema.validate(mockScent);

        expect(validation1).to.have.property('error'); 
        expect(validation1.error.details[0].path[0]).to.equal('note');
    });

});