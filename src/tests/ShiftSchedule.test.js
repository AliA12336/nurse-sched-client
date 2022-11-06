//testing priority
// 1) High value features -> 2) Edge cases -> 3) easy to break features -> 4) Basic components

import ShiftSchedule from '../components/ShiftSchedule'
import { render } from '@testing-library/react';
import React, { useState } from 'react';


describe("Conditional rendering ShiftSchedule", () => {
    it("should return null if shift array is empty", () => {
        const [shifts, setShifts] = React.useState([]);
        const setState = jest.fn();
        jest
            .spyOn(React, 'useState')
            .mockImplementationOnce((initState) => initState, setState);
        const { container } = render(<ShiftSchedule />)
        expect(container).toBeEmptyDomElement();
    });

    it("should render a ShiftSchedule component if shift array is not empty",
        () => {

    });

});

describe("Button click", () => {
    it("pops up Shift Assignment form", () => {

    });
});

describe("Clicking Save Assignment form submission button", () => {
    it("pops up an alert if nurse has a conflicting shift time", () => {

    })

    it("pops up an alert if nurse does not have correct qualifications", () => {

    })

    it("updates the schedule with selected nurse added to selected shift", () => {

    })
})
