import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shared-dropdown-v2',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './shared-dropdown-v2.component.html',
  styleUrl: './shared-dropdown-v2.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedDropdownV2Component),
      multi: true,
    },
  ],
})
export class SharedDropdownV2Component implements OnInit {
  @Input() options: { value: string; label: string }[] = [];
  @Input() placeholder: string = 'Select an option';

  private clickListener: (() => void) | undefined;

  value: any;
  isDisabled: boolean = false;

  isOpenOption: boolean = false;

  selectedOption: { value: string; label: string } = {value: '', label: ''};

  onChange = (value: string) => {};
  onTouched = () => {};

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  ngOnInit(): void {
    if (this.options.length > 0) {
      this.selectedOption = this.options[0];
      this.value = this.selectedOption.value;
      this.onChange(this.value);
    }
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
      this.selectedOption = this.options.find(option => option.value === value) || { value: '', label: '' };
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
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
