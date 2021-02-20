const { expect } = require('chai');

const { intensitySchema } = require('../app/schemas/modelSchemas');

let mockIntensity;

describe('Intensity schema', function() {

    before(function() {
        //  l'objet à valider
        mockIntensity = {
            type: "Extrait",
        };
    });

    it('should validate a valid Intensity', function() {

        expect(intensitySchema.validate(mockIntensity)).not.to.have.property('error');

    });

    it('should not validate a Intensity with a name less than 5 characters long', function() {

        mockIntensity.type = "Gars";

        const validation = intensitySchema.validate(mockIntensity);

        expect(validation).to.have.property('error'); 
        expect(validation.error.details[0].path[0]).to.equal('type');
    });


    it('should not validate a Intensity with an empty type', function() {

        mockIntensity.type = " ";

        const validation1 = intensitySchema.validate(mockIntensity);

        expect(validation1).to.have.property('error'); 
        expect(validation1.error.details[0].path[0]).to.equal('type');
    });

});