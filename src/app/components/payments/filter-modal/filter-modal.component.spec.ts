import { FilterModalComponent } from "./filter-modal.component"

describe('FilterModalComponent' , () => {
    let component: FilterModalComponent;
    let bottomSheet;
    beforeEach(() => {
        bottomSheet = jasmine.createSpyObj('MatBottomSheet', ['open']);

        component = new FilterModalComponent(bottomSheet);
    });

    it('should create the component', () => expect(component).toBeTruthy());
})