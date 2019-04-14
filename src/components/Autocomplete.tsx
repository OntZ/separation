/**
 * Light wrapper over Typeahead to make API more straightforward and styles easier on the eyes
 */

import * as React from 'react';
import { Typeahead, TypeaheadModel, TypeaheadLabelKey, TypeaheadProps } from 'react-bootstrap-typeahead';
import './Autocomplete.scss'

interface IAutocompleteProps<T extends TypeaheadModel> {
  options: T[];
  value?: T;
  labelKey: TypeaheadLabelKey<T>;
  label?: string;
  valueSelected: (value: T) => void;
  id?: string;
}

export class Autocomplete<T extends TypeaheadModel> extends React.Component<IAutocompleteProps<T>> {
  public render() {
    const props: TypeaheadProps<T> = {
      options: this.props.options,
      onChange: this.valueSelected,
      labelKey: this.props.labelKey,
      /** It "needs an ID for accessibility purposes", doesn't let you opt out */
      id: this.props.id || Math.random()
    };

    if (this.props.value) {
      props.selected = [this.props.value];
    }

    return (
      <div className="autocomplete">
        {this.props.label && <label className="autocomplete__label">{this.props.label}</label>}
        <Typeahead {...props}/>
      </div>
    )
  }

  public valueSelected = (value: T[]) => this.props.valueSelected(value[0]);
}