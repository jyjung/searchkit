import MultipleSelectFacet from '../MultipleSelectFacet'

describe('Multiple Select Facet', () => {
  const msf = new MultipleSelectFacet({ id: 'testId', label: 'Test', field: 'testField' })

  it('getFilter', () => {
    expect(msf.getFilter({ id: 'test', selected: ['testValue'] })).toEqual({
      bool: { should: [{ term: { testField: 'testValue' } }] }
    })
  })

  it('getAggregation', () => {
    expect(msf.getAggregation()).toEqual({ testId: { terms: { field: 'testField', size: 5 } } })
  })

  it('transformResponse', () => {
    expect(
      msf.transformResponse({
        buckets: [
          { key: 'bla', doc_count: 1 },
          { key: 'da', doc_count: 1 }
        ]
      })
    ).toEqual({
      entries: [
        { count: 1, id: 'testId_bla', label: 'bla' },
        { count: 1, id: 'testId_da', label: 'da' }
      ],
      id: 'testId',
      label: 'Test',
      type: 'MultipleSelectFacet'
    })
  })
})
