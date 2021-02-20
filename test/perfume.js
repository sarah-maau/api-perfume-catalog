const { expect } = require('chai');

const { perfumeSchema } = require('../app/schemas/modelSchemas');

let mockPerfume;

describe('Perfume schema', function() {

    before(function() {
        // l'objet à valider
        mockPerfume = {
            name: "Chanel N°5",
            creator: "Ernest Beaux",
            yearOfCreation: "1921-05-05",
            score: 3,
            brandId: 1,
            intensityId: 2,
            genderId: 1
        };

        console.log(mockPerfume)

    });

    it('should validate a valid Perfume', function() {

        expect(perfumeSchema.validate(mockPerfume)).not.to.have.property('error');

    });

    it('should not validate a Perfume with a name less than 2 characters long', function() {

        mockPerfume.name = "A";

        const validation = perfumeSchema.validate(mockPerfume);

        expect(validation).to.have.property('error'); 
        expect(validation.error.details[0].path[0]).to.equal('name');
    });


    it('should not validate a Perfume with an empty name', function() {

        mockPerfume.name = " ";

        const validation1 = perfumeSchema.validate(mockPerfume);

        expect(validation1).to.have.property('error'); 
        expect(validation1.error.details[0].path[0]).to.equal('name');
    });

    it('should not validate a Perfume with a creator less than 5 characters long', function() {

        mockPerfume.name = "long enough";
        mockPerfume.creator = "Bob";

        const validation2 = perfumeSchema.validate(mockPerfume);

        expect(validation2).to.have.property('error'); 
        expect(validation2.error.details[0].path[0]).to.equal('creator');
    });

    it('should not validate a Perfume with a score less than 0', function() {

        mockPerfume.creator = "long enough";
        mockPerfume.score = -1;

        const validation3 = perfumeSchema.validate(mockPerfume);

        expect(validation3).to.have.property('error'); 
        expect(validation3.error.details[0].path[0]).to.equal('score');
    });

    it('should not validate a Perfume with a score more than 5', function() {

        mockPerfume.score = 6;

        const validation4 = perfumeSchema.validate(mockPerfume);

        expect(validation4).to.have.property('error'); 
        expect(validation4.error.details[0].path[0]).to.equal('score');
    });

    it('should not validate a Perfume with a float score', function() {

        mockPerfume.score = 4.5;

        const validation5 = perfumeSchema.validate(mockPerfume);

        expect(validation5).to.have.property('error'); 
        expect(validation5.error.details[0].path[0]).to.equal('score');
    });

    it('should not validate a Perfume with a yearOfCreation > current year', function() {

        mockPerfume.score = 3;
        mockPerfume.yearOfCreation = "2022-01-01";

        const validation6 = perfumeSchema.validate(mockPerfume);

        expect(validation6).to.have.property('error'); 
        expect(validation6.error.details[0].path[0]).to.equal('yearOfCreation');
    });

    it('should not validate a Perfume with a brandId which is not a positive integer', function() {

        mockPerfume.yearOfCreation = "2021-01-01";
        mockPerfume.brandId = -1;

        const validation7 = perfumeSchema.validate(mockPerfume);

        expect(validation7).to.have.property('error'); 
        expect(validation7.error.details[0].path[0]).to.equal('brandId');
    });

    it('should not validate a Perfume with a brandId which is a string', function() {

        mockPerfume.brandId = "A";

        const validation8 = perfumeSchema.validate(mockPerfume);

        expect(validation8).to.have.property('error'); 
        expect(validation8.error.details[0].path[0]).to.equal('brandId');
    });

    it('should not validate a Perfume with a brandId which is a float', function() {

        mockPerfume.brandId = 1.2;

        const validation9 = perfumeSchema.validate(mockPerfume);

        expect(validation9).to.have.property('error'); 
        expect(validation9.error.details[0].path[0]).to.equal('brandId');
    });

    it('should not validate a Perfume with a intensityId which is not a positive integer', function() {

        mockPerfume.brandId = 1;
        mockPerfume.intensityId = -1;

        const validation10 = perfumeSchema.validate(mockPerfume);

        expect(validation10).to.have.property('error'); 
        expect(validation10.error.details[0].path[0]).to.equal('intensityId');
    });

    it('should not validate a Perfume with a intensityId which is a string', function() {

        mockPerfume.intensityId = "A";

        const validation11 = perfumeSchema.validate(mockPerfume);

        expect(validation11).to.have.property('error'); 
        expect(validation11.error.details[0].path[0]).to.equal('intensityId');
    });

    it('should not validate a Perfume with a intensityId which is a float', function() {

        mockPerfume.intensityId = 1.2;

        const validation12 = perfumeSchema.validate(mockPerfume);

        expect(validation12).to.have.property('error'); 
        expect(validation12.error.details[0].path[0]).to.equal('intensityId');
    });

    it('should not validate a Perfume with a genderId which is not a positive integer', function() {

        mockPerfume.intensityId = 1;
        mockPerfume.genderId = -1;

        const validation13 = perfumeSchema.validate(mockPerfume);

        expect(validation13).to.have.property('error'); 
        expect(validation13.error.details[0].path[0]).to.equal('genderId');
    });

    it('should not validate a Perfume with a genderId which is a string', function() {

        mockPerfume.genderId = "A";

        const validation14 = perfumeSchema.validate(mockPerfume);

        expect(validation14).to.have.property('error'); 
        expect(validation14.error.details[0].path[0]).to.equal('genderId');
    });

    it('should not validate a Perfume with a genderId which is a float', function() {

        mockPerfume.genderId = 1.2;

        const validation15 = perfumeSchema.validate(mockPerfume);

        expect(validation15).to.have.property('error'); 
        expect(validation15.error.details[0].path[0]).to.equal('genderId');
    });


});