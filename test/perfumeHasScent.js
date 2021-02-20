const { expect } = require('chai');

const { perfumeScentSchema } = require('../app/schemas/modelSchemas');

let mockPS;

describe('PerfumeHasScent schema', function() {

    before(function() {
        //  l'objet à valider
        mockPS = {
            perfumeId: 1,
            scentId: 2
        };
    });

    it('should validate a valid PerfumeHasScent', function() {

        expect(perfumeScentSchema.validate(mockPS)).not.to.have.property('error');

    });

    it('should not validate a perfumeId which is a string', function() {

        mockPS.perfumeId = "A";

        const validation = perfumeScentSchema.validate(mockPS);

        expect(validation).to.have.property('error'); 
        expect(validation.error.details[0].path[0]).to.equal('perfumeId');
    });

    it('should not validate a float perfumeId', function() {

        mockPS.perfumeId = 1.2;

        const validation1 = perfumeScentSchema.validate(mockPS);

        expect(validation1).to.have.property('error'); 
        expect(validation1.error.details[0].path[0]).to.equal('perfumeId');
    });

    it('should not validate a perfumeId which is not an integer', function() {

        mockPS.perfumeId === "1";

        const validation2 = perfumeScentSchema.validate(mockPS);

        expect(validation2).to.have.property('error'); 
        expect(validation2.error.details[0].path[0]).to.equal('perfumeId');
    });

    it('should not validate a scentId which is a string', function() {

        mockPS.perfumeId = 1;
        mockPS.scentId = "A";

        const validation3 = perfumeScentSchema.validate(mockPS);

        expect(validation3).to.have.property('error'); 
        expect(validation3.error.details[0].path[0]).to.equal('scentId');
    });

    it('should not validate a float scentId', function() {

        mockPS.scentId = 1.2;

        const validation4 = perfumeScentSchema.validate(mockPS);

        expect(validation4).to.have.property('error'); 
        expect(validation4.error.details[0].path[0]).to.equal('scentId');
    });

    it('should not validate a scentId which is not an integer', function() {

        mockPS.scentId === "1";

        const validation5 = perfumeScentSchema.validate(mockPS);

        expect(validation5).to.have.property('error'); 
        expect(validation5.error.details[0].path[0]).to.equal('scentId');
    });

});