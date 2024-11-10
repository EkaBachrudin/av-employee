import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shared-dropdown-v1',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './shared-dropdown-v1.component.html',
  styleUrl: './shared-dropdown-v1.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedDropdownV1Component),
      multi: true,
    },
  ],
})
export class SharedDropdownV1Component {
  @Input() options: { value: string; label: string }[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() isSearch: boolean = false;

  private clickListener: (() => void) | undefined;

  value: string = '';
  isDisabled: boolean = false;

  isOpenOption: boolean = false;

  selectedOption: { value: string; label: string } = {value: '', label: ''};

  searchValue: string = '';

  filteredOption: { value: string; label: string }[] = [];

  selectedIndex = 0;

  onChange = (value: string) => {};
  onTouched = () => {};

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.filteredOption = this.options;
    if (this.options.length > 0) {
      this.selectedOption = this.options[0];
      this.value = this.selectedOption.value;
      this.onChange(this.value);
    }
  }

  writeValue(value: string): void {
    if (value !== undefined) {
      this.value = value;
      this.selectedOption = this.options.find(option => option.value === value) || { value: '', label: '' };
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onSelect(value: string): void {
    this.isOpenOption = false;
    this.value = value;
    this.selectedOption = this.options.find(option => option.value === value) || { value: '', label: '' };
    this.onChange(this.value);
    this.onTouched();
  }

  toggleOption() {
    this.isOpenOption = !this.isOpenOption;

    if (this.isOpenOption) {
      this.addOutsideClickListener();
    } else {
      this.removeOutsideClickListener();
    }
  }

  searchValueMethod() {
    this.filteredOption = this.options;
    this.filteredOption = this.filteredOption.filter(val => val.value.toLowerCase().includes(this.searchValue.toLowerCase()) )
  }

  onKeydown(event: KeyboardEvent) {
    if (!this.isOpenOption) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = (this.selectedIndex - 1 + this.options.length) % this.options.length;
        break;
      case 'Enter':
        this.isOpenOption = false;
        break;
    }

    this.selectedOption = this.options[this.selectedIndex];
  }

  private addOutsideClickListener() {
    this.clickListener = this.renderer.listen('document', 'click', (event) => {
      const clickedInside = this.elRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.isOpenOption = false;
        this.removeOutsideClickListener();
      }
    });
  }

  private removeOutsideClickListener() {
    if (this.clickListener) {
      this.clickListener();
      this.clickListener = undefined;
    }
  }

  ngOnDestroy() {
    this.removeOutsideClickListener();
  }
}
