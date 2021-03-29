const { expect } = require('chai');

const { tagSchema } = require('.../app/services/schema');

let mockTag;

describe('Tag schema', function() {

    before(function() {
        // l'objet à valider
        mockTag = {
            label: 'Fleuri',
            color: '#3B5998'
        };
    });

    it('should validate a valid Tag', function() {

        expect(tagSchema.validate(mockTag)).not.to.have.property('error');

    });

    it('should not validate a Tag with a label less than 2 characters long', function() {

        mockTag.label = "A";

        const validation = tagSchema.validate(mockTag);

        expect(validation).to.have.property('error'); 
        expect(validation.error.details[0].path[0]).to.equal('label');
    });


    it('should not validate a Tag with an empty label', function() {

        mockTag.label = " ";

        const validation1 = tagSchema.validate(mockTag);

        expect(validation1).to.have.property('error'); 
        expect(validation1.error.details[0].path[0]).to.equal('label');
    });


    it('should not validate a Tag with an non valid color code', function() {

        mockTag.label = "Fleuri";
        mockTag.color = "azerty"

        const validation2 = tagSchema.validate(mockTag);

        expect(validation2).to.have.property('error'); 
        expect(validation2.error.details[0].path[0]).to.equal('color');
    });

});