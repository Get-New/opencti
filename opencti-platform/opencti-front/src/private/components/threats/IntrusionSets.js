import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'ramda';
import { QueryRenderer } from '../../../relay/environment';
import inject18n from '../../../components/i18n';
import ListCards from '../../../components/list_cards/ListCards';
import ListLines from '../../../components/list_lines/ListLines';
import IntrusionSetsCards, {
  intrusionSetsCardsQuery,
} from './intrusion_sets/IntrusionSetsCards';
import IntrusionSetsLines, {
  intrusionSetsLinesQuery,
} from './intrusion_sets/IntrusionSetsLines';
import IntrusionSetCreation from './intrusion_sets/IntrusionSetCreation';

class IntrusionSets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'name',
      orderAsc: true,
      searchTerm: '',
      view: 'cards',
    };
  }

  handleChangeView(mode) {
    this.setState({ view: mode });
  }

  handleSearch(value) {
    this.setState({ searchTerm: value });
  }

  handleSort(field, orderAsc) {
    this.setState({ sortBy: field, orderAsc });
  }

  renderCards(paginationOptions) {
    const { sortBy, orderAsc } = this.state;
    const dataColumns = {
      name: {
        label: 'Name',
      },
      created: {
        label: 'Creation date',
      },
      modified: {
        label: 'Modification date',
      },
    };
    return (
      <ListCards
        sortBy={sortBy}
        orderAsc={orderAsc}
        dataColumns={dataColumns}
        handleSort={this.handleSort.bind(this)}
        handleSearch={this.handleSearch.bind(this)}
        handleChangeView={this.handleChangeView.bind(this)}
        displayImport={true}
      >
        <QueryRenderer
          query={intrusionSetsCardsQuery}
          variables={{ count: 25, ...paginationOptions }}
          render={({ props }) => (
            <IntrusionSetsCards
              data={props}
              paginationOptions={paginationOptions}
              initialLoading={props === null}
            />
          )}
        />
      </ListCards>
    );
  }

  renderLines(paginationOptions) {
    const { sortBy, orderAsc } = this.state;
    const dataColumns = {
      name: {
        label: 'Name',
        width: '60%',
        isSortable: true,
      },
      created: {
        label: 'Creation date',
        width: '15%',
        isSortable: true,
      },
      modified: {
        label: 'Modification date',
        width: '15%',
        isSortable: true,
      },
    };
    return (
      <ListLines
        sortBy={sortBy}
        orderAsc={orderAsc}
        dataColumns={dataColumns}
        handleSort={this.handleSort.bind(this)}
        handleSearch={this.handleSearch.bind(this)}
        handleChangeView={this.handleChangeView.bind(this)}
        displayImport={true}
      >
        <QueryRenderer
          query={intrusionSetsLinesQuery}
          variables={{ count: 25, ...paginationOptions }}
          render={({ props }) => (
            <IntrusionSetsLines
              data={props}
              paginationOptions={paginationOptions}
              dataColumns={dataColumns}
              initialLoading={props === null}
            />
          )}
        />
      </ListLines>
    );
  }

  render() {
    const {
      view, sortBy, orderAsc, searchTerm,
    } = this.state;
    const paginationOptions = {
      search: searchTerm,
      orderBy: sortBy,
      orderMode: orderAsc ? 'asc' : 'desc',
    };
    return (
      <div>
        {view === 'cards' ? this.renderCards(paginationOptions) : ''}
        {view === 'lines' ? this.renderLines(paginationOptions) : ''}
        <IntrusionSetCreation paginationOptions={paginationOptions} />
      </div>
    );
  }
}

IntrusionSets.propTypes = {
  t: PropTypes.func,
  history: PropTypes.object,
};

export default compose(inject18n)(IntrusionSets);