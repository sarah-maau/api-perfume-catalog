const { expect } = require('chai');

const { perfumeTagSchema } = require('../app/services/schema');

let mockPS;

describe('perfumeHasTag schema', function() {

    before(function() {
        //  l'objet à valider
        mockPT = {
            perfumeId: 1,
            tagId: 2
        };
    });

    it('should validate a valid perfumeHasTag', function() {

        expect(perfumeTagSchema.validate(mockPT)).not.to.have.property('error');

    });

    it('should not validate a perfumeId which is a string', function() {

        mockPT.perfumeId = "A";

        const validation = perfumeTagSchema.validate(mockPT);

        expect(validation).to.have.property('error'); 
        expect(validation.error.details[0].path[0]).to.equal('perfumeId');
    });

    it('should not validate a float perfumeId', function() {

        mockPT.perfumeId = 1.2;

        const validation1 = perfumeTagSchema.validate(mockPT);

        expect(validation1).to.have.property('error'); 
        expect(validation1.error.details[0].path[0]).to.equal('perfumeId');
    });

    it('should not validate a perfumeId which is not an integer', function() {

        mockPT.perfumeId === "1";

        const validation2 = perfumeTagSchema.validate(mockPT);

        expect(validation2).to.have.property('error'); 
        expect(validation2.error.details[0].path[0]).to.equal('perfumeId');
    });

    it('should not validate a tagId which is a string', function() {

        mockPT.perfumeId = 1;
        mockPT.tagId = "A";

        const validation3 = perfumeTagSchema.validate(mockPT);

        expect(validation3).to.have.property('error'); 
        expect(validation3.error.details[0].path[0]).to.equal('tagId');
    });

    it('should not validate a float tagId', function() {

        mockPT.tagId = 1.2;

        const validation4 = perfumeTagSchema.validate(mockPT);

        expect(validation4).to.have.property('error'); 
        expect(validation4.error.details[0].path[0]).to.equal('tagId');
    });

    it('should not validate a tagId which is not an integer', function() {

        mockPT.tagId === "1";

        const validation5 = perfumeTagSchema.validate(mockPT);

        expect(validation5).to.have.property('error'); 
        expect(validation5.error.details[0].path[0]).to.equal('tagId');
    });

});