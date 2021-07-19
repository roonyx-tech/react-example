import { gql } from '@apollo/client';

export const accountQuery = gql`
  query account {
    account {
      id
      firstName
      lastName
      displayName
      email
      login
      directorates {
        directorateId
        visibilityType
        canEdit
        directorate {
          id
          name
          shortName
        }
      }
      domains {
        domainId
        visibilityType
        canEdit
        domain {
          id
          name
        }
      }
      portfolios {
        portfolioId
        visibilityType
        canEdit
        portfolio {
          id
          name
        }
      }
      permissions
      roles
      opexDepartment {
        id
        name
      }
      opexActivitiesAmount
    }
  }
`;

export const dashbordFilterQuery = gql`
  query dashboardFilter($includeDirectoratesBK: Boolean!) {
    tags {
      id
      name
    }
    directorates {
      id
      shortName
    }
    directoratesBK @include(if: $includeDirectoratesBK) {
      id
      name
    }
    kinds: projectKinds(ignoreRole: true) {
      id
      name
    }
    statuses: projectStatuses {
      id
      name
    }
    portfolios: projectPortfolios {
      id
      name
    }
  }
`;

export const managersFilterQuery = gql`
  query managersFilter($page: Int, $size: Int, $search: String) {
    managers(page: $page, size: $size, search: $search) {
      list {
        id
        displayName
      }
      count
    }
  }
`;

export const projectsFilterQuery = gql`
  query projectsFilter(
    $from: DateTime
    $to: DateTime
    $managerIds: [Int!]
    $tagIds: [Int!]
    $directorateIds: [Int!]
    $directorateBKIds: [Int!]
    $withoutManagers: Boolean
    $status: ProjectType
    $page: Int
    $size: Int
    $search: String
    $outOfBudget: Boolean
  ) {
    projects(
      from: $from
      to: $to
      managerIds: $managerIds
      tagIds: $tagIds
      directorateIds: $directorateIds
      directorateBKIds: $directorateBKIds
      withoutManagers: $withoutManagers
      type: $status
      page: $page
      size: $size
      search: $search
      outOfBudget: $outOfBudget
    ) {
      list {
        id
        name
        sapProject {
          code
        }
      }
      count
    }
  }
`;

export const bondedProjects = gql`
  query projects($bondedInitiatives: Boolean) {
    projects(bondedInitiatives: $bondedInitiatives) {
      list {
        id
        name
      }
      count
    }
  }
`;

export const projectsQuery = gql`
  query projects(
    $ids: [Int!]
    $from: DateTime
    $to: DateTime
    $managerIds: [Int!]
    $tagIds: [Int!]
    $kindIds: [Int!]
    $statusIds: [Int!]
    $portfolioIds: [Int!]
    $directorateIds: [Int!]
    $directorateBKIds: [Int!]
    $withoutManagers: Boolean
    $status: ProjectType
    $sort: ProjectSortBy
    $page: Int
    $size: Int
    $search: String
    $outOfBudget: Boolean
  ) {
    projects: projects(
      ids: $ids
      from: $from
      to: $to
      managerIds: $managerIds
      tagIds: $tagIds
      kindIds: $kindIds
      statusIds: $statusIds
      portfolioIds: $portfolioIds
      directorateIds: $directorateIds
      directorateBKIds: $directorateBKIds
      withoutManagers: $withoutManagers
      type: $status
      page: $page
      size: $size
      search: $search
      sort: $sort
      outOfBudget: $outOfBudget
    ) {
      list {
        id
        active
        name
        state
        startDate
        finishDate
        budget
        sapProject {
          name
          code
          state
          planStart
          planFinish
          factStart
          factFinish
        }
        managers {
          id
          firstName
          lastName
          displayName
        }
        tags {
          id
          name
        }
        forecast
        portfolio {
          name
        }
        status {
          name
        }
      }
      count
    }
    tags: chart(
      name: "tag-indicators"
      params: {
        projectIds: $ids
        from: $from
        to: $to
        managerIds: $managerIds
        tagIds: $tagIds
        directorateIds: $directorateIds
        withoutManagers: $withoutManagers
        type: $status
        outOfBudget: $outOfBudget
      }
    )
  }
`;

export const projectsIndicatorsQuery = gql`
  query projectsIndicatorsQuery(
    $projectIds: [Int!]
    $from: DateTime
    $to: DateTime
    $managerIds: [Int!]
    $tagIds: [Int!]
    $kindIds: [Int!]
    $statusIds: [Int!]
    $portfolioIds: [Int!]
    $directorateIds: [Int!]
    $directorateBKIds: [Int!]
    $withoutManagers: Boolean
    $status: ProjectType
    $outOfBudget: Boolean
  ) {
    indicators: chart(
      name: "project-indicators-sum"
      params: {
        projectIds: $projectIds
        from: $from
        to: $to
        managerIds: $managerIds
        tagIds: $tagIds
        kindIds: $kindIds
        statusIds: $statusIds
        portfolioIds: $portfolioIds
        directorateIds: $directorateIds
        withoutManagers: $withoutManagers
        directorateBKIds: $directorateBKIds
        type: $status
        outOfBudget: $outOfBudget
      }
    )
    sppChart: chart(
      name: "spp-group-indicators"
      params: {
        projectIds: $projectIds
        from: $from
        to: $to
        managerIds: $managerIds
        tagIds: $tagIds
        kindIds: $kindIds
        statusIds: $statusIds
        portfolioIds: $portfolioIds
        directorateIds: $directorateIds
        directorateBKIds: $directorateBKIds
        withoutManagers: $withoutManagers
        type: $status
        outOfBudget: $outOfBudget
      }
    )
  }
`;

export const projectsIndicatorsByDirectoratesQuery = gql`
  query projectsIndicatorsByDirectoratesQuery(
    $projectIds: [Int!]
    $from: DateTime
    $to: DateTime
    $managerIds: [Int!]
    $tagIds: [Int!]
    $kindIds: [Int!]
    $statusIds: [Int!]
    $portfolioIds: [Int!]
    $directorateIds: [Int!]
    $directorateBKIds: [Int!]
    $withoutManagers: Boolean
    $status: ProjectType
    $outOfBudget: Boolean
    $year: Int
  ) {
    indicators: chart(
      name: "indicators-by-direction"
      params: {
        projectIds: $projectIds
        from: $from
        to: $to
        managerIds: $managerIds
        tagIds: $tagIds
        kindIds: $kindIds
        statusIds: $statusIds
        portfolioIds: $portfolioIds
        directorateIds: $directorateIds
        directorateBKIds: $directorateBKIds
        withoutManagers: $withoutManagers
        type: $status
        outOfBudget: $outOfBudget
        year: $year
      }
    )
    factByDirectorates: chart(
      name: "fact-by-direction"
      params: {
        projectIds: $projectIds
        from: $from
        to: $to
        managerIds: $managerIds
        tagIds: $tagIds
        kindIds: $kindIds
        statusIds: $statusIds
        portfolioIds: $portfolioIds
        directorateIds: $directorateIds
        directorateBKIds: $directorateBKIds
        withoutManagers: $withoutManagers
        type: $status
        outOfBudget: $outOfBudget
        year: $year
      }
    )
  }
`;

export const projectsMetricsQuery = gql`
  query projectsMetricsQuery($projectIds: [Int!]) {
    metrics: chart(name: "project-indicators", params: { projectIds: $projectIds })
  }
`;

export const consumptionQuery = gql`
  query consumption($ids: [Int!], $year: Int!, $previousYear: Int!) {
    consumption: chart(name: "outcome-cumulative", params: { projectIds: $ids, year: $year })
    previousYearConsumption: chart(name: "outcome-cumulative", params: { projectIds: $ids, year: $previousYear })
    budgetLimit: chart(name: "budget-by-direction", params: { projectIds: $ids, year: $year })
  }
`;

export const projectQuery = gql`
  query project($id: Int!, $includeDirectorateBK: Boolean!) {
    project(id: $id) {
      id
      active
      name
      state
      projectRef {
        id
        name
      }
      startDate
      finishDate
      createdDate
      kind {
        id
        name
      }
      status {
        id
        name
      }
      portfolio {
        id
        name
      }
      permissions {
        canEdit
      }
      forecastSPPGroups {
        id
        visible
        editType
        directorate {
          id
        }
        group {
          id
        }
      }
      sapProject {
        code
        name
        state
        planStart
        planFinish
        factStart
        factFinish
      }
      unit {
        id
        name
      }
      directorates {
        id
        name
        shortName
      }
      directorateBK @include(if: $includeDirectorateBK) {
        id
        name
      }
      managers {
        id
        displayName
      }
      participants {
        id
        displayName
      }
      tags {
        id
        name
      }
      files {
        uid
        originalName
        mimeType
      }
      jiraLink
      domain {
        id
        name
      }
      approvalDate
      approvalLevel {
        id
        name
      }
      effect {
        id
        name
      }
      customerCategory {
        id
        name
        # customer {
        #   id
        #   name
        # }
      }
      capexSubgroup {
        id
        name
        # capexGroup {
        #   id
        #   name
        # }
      }
    }
    indicators: chart(name: "project-indicators", params: { projectIds: [$id] })
    sppChart: chart(name: "spp-indicators", params: { projectIds: [$id] })
    sppGroupsChart: chart(name: "spp-group-indicators", params: { projectIds: [$id] })
    facts: chart(name: "project-fact-directorate", params: { projectIds: [$id] })
    obligo: chart(name: "project-obligo-directorate", params: { projectIds: [$id] })
    forecast: forecast(projectId: $id) {
      id
      period
      forecast
      itemId
      directorateId
    }
    cashflowItemsTree(projectId: $id, subtypes: [CAPEX, OPEX]) {
      id
      type
      subtype
      name
      children {
        id
        type
        children {
          id
          type
          name
          directorateId
        }
      }
    }
    cashflowItems(types: [SPPGroup], subtypes: [CAPEX, OPEX]) {
      id
      type
      subtype
      name
    }
  }
`;

export const forecastSPPGroupsQuery = gql`
  query project($id: Int!) {
    sppGroupsVisualisation: project(id: $id) {
      forecastSPPGroups {
        id
        visible
        editType
        group {
          id
        }
      }
    }
  }
`;

export const sapProjectsQuery = gql`
  query sapProjects($notLinked: Boolean) {
    sapProjects(notLinked: $notLinked) {
      code
      name
      state
      planStart
      planFinish
      factStart
      factFinish
    }
  }
`;

export const usersQuery = gql`
  query users($page: Int, $size: Int, $search: String, $sort: SortDirection) {
    users(page: $page, size: $size, search: $search, sort: $sort) {
      list {
        id
        displayName
        roles
        directorates {
          directorateId
          visibilityType
          directorate {
            id
            name
            shortName
          }
        }
        position
      }
      count
    }
  }
`;

export const tagsQuery = gql`
  query tags {
    tags {
      id
      name
    }
  }
`;

export const optionsQuery = gql`
  query options($includeDirectoratesBK: Boolean!) {
    users {
      list {
        id
        displayName
      }
    }
    tags {
      id
      name
    }
    directorates {
      id
      shortName
    }
    directoratesBK @include(if: $includeDirectoratesBK) {
      id
      name
    }
    capexSubgroups {
      id
      name
      capexGroup {
        id
        name
      }
    }
    customerCategories {
      id
      name
      customer {
        id
        name
      }
    }
  }
`;

// export const loadBudgetData = gql`
//   query($projectId: Int!) {
//     budget: chart(name: "project-budget", params: { projectId: $projectId }),
//     fact: chart(name: "project-fact", params: { projectId: $projectId }),
//     obligo: chart(name: "project-obligo", params: { projectId: $projectId }),
//     remainder: chart(name: "project-remainder", params: { projectId: $projectId }),
//     forecast: chart(name: "project-forecast", params: { projectId: $projectId })
//   }
// `;

export const loadSumWageIndicators = gql`
  query dashboardTopIndicators(
    $from: String!
    $to: String!
    $kindIds: [Int!]
    $directorateBKIds: [Int!]
    $capexGroupIds: [Int!]
    $activeOrWithBudgetBK: Boolean!
  ) {
    sumIndicators: chart(
      name: "indicators-sum"
      params: {
        from: $from
        to: $to
        kindIds: $kindIds
        directorateBKIds: $directorateBKIds
        capexGroupIds: $capexGroupIds
        activeOrWithBudgetBK: $activeOrWithBudgetBK
      }
    )
    wageFundIndicators: chart(
      name: "wage-fund-indicators"
      params: {
        from: $from
        to: $to
        kindIds: $kindIds
        directorateBKIds: $directorateBKIds
        capexGroupIds: $capexGroupIds
        activeOrWithBudgetBK: $activeOrWithBudgetBK
      }
    )
    wageFundIndicatorsByMonth: chart(
      name: "wage-fund-indicators-by-month"
      params: {
        from: $from
        to: $to
        kindIds: $kindIds
        directorateBKIds: $directorateBKIds
        capexGroupIds: $capexGroupIds
        activeOrWithBudgetBK: $activeOrWithBudgetBK
      }
    )
  }
`;
export const loadDashboardTopGraphics = gql`
  query dashboardTopGraphics(
    $from: String!
    $to: String!
    $kindIds: [Int!]
    $directorateBKIds: [Int!]
    $capexGroupIds: [Int!]
    $activeOrWithBudgetBK: Boolean!
  ) {
    directoratesBkIndicators: chart(
      name: "directorates-bk-indicators"
      params: {
        from: $from
        to: $to
        kindIds: $kindIds
        directorateBKIds: $directorateBKIds
        capexGroupIds: $capexGroupIds
        activeOrWithBudgetBK: $activeOrWithBudgetBK
      }
    )
    capexGroupsIndicators: chart(
      name: "capex-groups-indicators"
      params: {
        from: $from
        to: $to
        kindIds: $kindIds
        directorateBKIds: $directorateBKIds
        capexGroupIds: $capexGroupIds
        activeOrWithBudgetBK: $activeOrWithBudgetBK
      }
    )
  }
`;

export const notLinkedProjectsQuery = gql`
  query {
    notLinkedProjects {
      id
      name
      sapProject {
        code
        name
      }
    }
  }
`;

export const historyQuery = gql`
  query historyQuery(
    $projectId: Int!
    $page: Int
    $size: Int
    $from: DateTime
    $to: DateTime
    $author: String
    $text: String
  ) {
    projectHistory(
      projectId: $projectId
      page: $page
      size: $size
      from: $from
      to: $to
      author: $author
      text: $text
    ) {
      list {
        id
        message
        author
        timestamp
        changes {
          id
          code
          message
          fromValue
          toValue
        }
      }
      count
    }
  }
`;

export const historyManagersQuery = gql`
  query historyManagers($projectId: Int!) {
    projectHistoryManagers(projectId: $projectId) {
      id
      displayName
    }
  }
`;

export const searchX5User = gql`
  query searchX5User($login: String!) {
    user: searchX5StaffByLogin(login: $login) {
      id
      firstName
      lastName
      login
      email
      middleName
      position
    }
  }
`;

export const directorateAndRolesQuery = gql`
  query directorateAndRolesQuery {
    directorates(forUser: false) {
      id
      name
      shortName
    }
    roles {
      key
    }
    projectDomains {
      id
      name
    }
    projectPortfolios: allPortfolios {
      id
      name
    }
  }
`;

export const userExistsQuery = gql`
  query userExists($login: String!) {
    userExists(login: $login)
  }
`;

export const userByIdQuery = gql`
  query userById($id: Int!) {
    user(id: $id) {
      id
      email
      login
      displayName
      firstName
      lastName
      middleName
      position
      roles
      staffId
      directorates {
        directorateId
        visibilityType
        canEdit
        directorate {
          id
          name
          shortName
        }
      }
      domains {
        domainId
        visibilityType
        canEdit
        domain {
          id
          name
        }
      }
      portfolios {
        portfolioId
        visibilityType
        canEdit
        portfolio {
          id
          name
        }
      }
    }
  }
`;

export const userProjectsQuery = gql`
  query userProjects($userId: Int!) {
    userProjects(userId: $userId) {
      id
      name
    }
  }
`;

export const projectParamsQuery = gql`
  query projectParams {
    projectKinds {
      id
      name
    }
    projectStatuses {
      id
      name
    }
    projectPortfolios: allPortfolios {
      id
      name
    }
    projectDomains {
      id
      name
    }
    projectApprovalLevels {
      id
      name
    }
    projectEffects {
      id
      name
    }
  }
`;

export const teoParamsQuery = gql`
  query teoParams {
    teoParameters {
      defaultUsefulLifeMonths
      defaultInvestmentPeriodMonths
      taxRate
    }
  }
`;

export const projectForecastAnalyticsQuery = gql`
  query projectForecastAnalytics(
    $projectIds: [Int!]
    $statusIds: [Int!]
    $kindIds: [Int!]
    $portfolioIds: [Int!]
    $managerIds: [Int!]
    $tagIds: [Int!]
    $withoutManagers: Boolean
    $outOfBudget: Boolean
    $directorateIds: [Int!]
    $type: ProjectType
    $size: Int
    $page: Int
    $forecastFrom: DateTime!
    $forecastTo: DateTime!
    $sort: ProjectsForecastAnalyticsSortObject
    $sortMonth: Int
    $sortYear: Int
  ) {
    projectForecastAnalytics(
      projectIds: $projectIds
      statusIds: $statusIds
      kindIds: $kindIds
      portfolioIds: $portfolioIds
      managerIds: $managerIds
      tagIds: $tagIds
      withoutManagers: $withoutManagers
      outOfBudget: $outOfBudget
      directorateIds: $directorateIds
      type: $type
      size: $size
      page: $page
      forecastFrom: $forecastFrom
      forecastTo: $forecastTo
      sort: $sort
      sortMonth: $sortMonth
      sortYear: $sortYear
    ) {
      list {
        projectId
        name
        code
        directorateName
        directorateId
        managers {
          displayName
        }
        startDate
        finishDate
        months {
          year
          month
          value
        }
        total
        lastMonthForecast
        updatedAt
        updatedBy
      }
      count
    }
  }
`;

export const waccParamsQuery = gql`
  query waccParams($fromYear: Int!, $toYear: Int!) {
    waccValues(fromYear: $fromYear, toYear: $toYear) {
      year
      wacc
    }
  }
`;

export const cashflowItemsForecastAnalyticsQuery = gql`
  query cashflowItemsForecastAnalytics(
    $projectId: Int!
    $start: DateTime!
    $finish: DateTime!
    $directorateIds: [Int!]
  ) {
    cashflowItemsForecastAnalytics(
      projectId: $projectId
      forecastTo: $finish
      forecastFrom: $start
      directorateIds: $directorateIds
    ) {
      id
      name
      directorateName
      months {
        year
        month
        value
      }
      total
      lastMonthForecast
      updatedAt
      updatedBy
      children {
        id
        name
        directorateName
        months {
          year
          month
          value
        }
        total
        lastMonthForecast
        updatedAt
        updatedBy
      }
    }
  }
`;

export const projectCommentsQuery = gql`
  query projectCommentsQuery($id: Int!) {
    comments: projectComments(projectId: $id) {
      id
      text
      author {
        displayName
        id
      }
      createdDate
      editingDate
      topic {
        id
      }
    }
    commentTopics {
      id
      name
      color
    }
  }
`;

export const corpusTotalYearsQuery = gql`
  query teoInvestmentYears($teoId: Int!) {
    years: teoInvestmentYears(teoId: $teoId)
  }
`;

export const corpusTotalByYearsQuery = gql`
  query corpusTotalByYearsQuery($teoId: Int!) {
    delta: teoTotalByYears(teoId: $teoId) {
      capex
      amortization
      ebitda
      tax
      fcf
      dcf
      year
    }
    teoActivities(teoId: $teoId) {
      asIs {
        ...teoActivities
      }
      toBe {
        ...teoActivities
      }
    }
  }

  fragment teoActivities on TeoActivities {
    primary {
      ...teoActivityFields
      itemsAmount
    }
    investment {
      ...teoActivityFields
      itemsAmount
    }
    indicators {
      title: name
      years {
        year
        value
      }
    }
  }

  fragment teoActivityFields on TeoActivity {
    years {
      year
      value
    }
    groups {
      title: name
      columnsData: years {
        year
        value
      }
      children {
        itemId: id
        title: name
        columnsData: years {
          year
          value
        }
        children {
          itemId: id
          title: name
          columnsData: years {
            year
            value
          }
        }
      }
    }
  }
`;

export const corpusTotalByMonthsQuery = gql`
  query corpusTotalByMonthsQuery($teoId: Int!, $year: Int!) {
    teoTotalByMonths(year: $year, teoId: $teoId) {
      capex
      amortization
      ebitda
      tax
      fcf
      dcf
      month
    }
  }
`;

export const teoProjectEffectQuery = gql`
  query teoProjectEffect($teoId: Int!) {
    teoProjectEffect(teoId: $teoId) {
      years {
        year
        value
      }
      itemsAmount
      groups {
        name
        years {
          year
          value
        }
        itemsAmount
        children {
          id
          name
          itemsAmount
          children {
            id
            name
            itemsAmount
            years {
              year
              value
            }
          }
          years {
            year
            value
          }
        }
        years {
          year
          value
        }
      }
      # title: name
      # children {
      #   itemId: id
      #   title: name
      #   children {
      #     itemId: id
      #     title: name
      #     columnsData: years {
      #       year
      #       value
      #     }
      #   }
      #   columnsData: years {
      #     year
      #     value
      #   }
      # }
      # columnsData: years {
      #   year
      #   value
      # }
    }
  }
`;

export const teoImpactPnLByMonths = gql`
  query teoImpactPnL($year: Int, $teoId: Int!) {
    expenses: teoImpactPnLByMonths(year: $year, teoId: $teoId) {
      item {
        id
        name
        type
        tooltip
        impactPnLType
      }
      months {
        period
        year
        asIs
        toBe
      }
    }
  }
`;

export const teoImpactPnLByYears = gql`
  query teoImpactPnLByYears($teoId: Int!) {
    teoImpactPnLByYears(teoId: $teoId) {
      item {
        id
        name
        type
      }
      years {
        period
        asIs
        toBe
      }
    }
  }
`;

export const teoCashflowItems = gql`
  query teoCashflowItems($teoId: Int!, $groupType: TeoGroupType!) {
    teoCashflowItems(teoId: $teoId, groupType: $groupType) {
      id
      item {
        id
        name
        type
        cashflowType
      }
      visible
    }
  }
`;

export const teoProjectExpensesCashflowItems = gql`
  query teoProjectExpensesCashflowItems($teoId: Int!, $capexGroup: TeoGroupType!, $opexGroup: TeoGroupType!) {
    capex: teoCashflowItems(teoId: $teoId, groupType: $capexGroup) {
      id
      item {
        id
        name
        type
        cashflowType
      }
      visible
    }
    opex: teoCashflowItems(teoId: $teoId, groupType: $opexGroup) {
      id
      item {
        id
        name
        type
        cashflowType
      }
      visible
    }
  }
`;

export const projectTeoList = gql`
  query projectTeoList($projectId: Int!) {
    projectTeoList(projectId: $projectId) {
      id
      name
      createdDate
      modifiedDate
      agreed
      version
      parameters {
        usefulLifeMonths
        investmentPeriodMonths
      }
    }
  }
`;

export const teoIndicatorsQuery = gql`
  query teoIndicators($teoId: Int!) {
    teoIndicators(teoId: $teoId) {
      irr
      irrCurrent
      pp
      ebitda
      dpp
      npv
      errors {
        irr
        irrCurrent
      }
    }
  }
`;

export const teoExpensesQuery = gql`
  query teoExpenses($teoId: Int!, $postProject: Boolean!) {
    capex: teoExpensesByMonths(teoId: $teoId, groupType: Capex, postProject: $postProject) {
      item {
        id
        name
      }
      months {
        period
        value
      }
    }
    opex: teoExpensesByMonths(teoId: $teoId, groupType: Opex, postProject: $postProject) {
      item {
        id
        name
      }
      months {
        period
        value
      }
    }
  }
`;

export const teoExpensesByMonths = gql`
  query teoExpensesByMonths($teoId: Int!, $year: Int, $groupType: TeoGroupType!) {
    teoExpensesByMonths(teoId: $teoId, year: $year, groupType: $groupType) {
      item {
        id
        name
      }
      months {
        period
        value
      }
    }
  }
`;

export const teoExpensesByYears = gql`
  query teoExpensesByYears($teoId: Int!, $groupType: TeoGroupType!) {
    teoExpensesByYears(teoId: $teoId, groupType: $groupType) {
      item {
        id
        name
      }
      years {
        period
        value
      }
    }
  }
`;

export const teo = gql`
  query teo($id: Int!) {
    teo(id: $id) {
      project {
        id
        startDate
        finishDate
      }
      parameters {
        usefulLifeMonths
        investmentPeriodMonths
      }
      newView
    }
  }
`;

export const teoImpactPnLItems = gql`
  query teoImpactPnLItemsTree($teoId: Int!) {
    data: teoImpactPnLItemsTree(teoId: $teoId) {
      single {
        ...TreeFragment
      }
      costPrice {
        ...TreeFragment
      }
      grossIncome {
        ...TreeFragment
      }
      operatingCosts {
        ...TreeFragment
      }
      capex {
        ...TreeFragment
      }
    }
  }
  fragment TreeFragment on TeoImpactPnLItemVisibility {
    id
    item {
      id
      name
      type
      cashflowType
    }
    nameInTeo
    tooltip
    visible
    children {
      id
      item {
        id
        name
        type
        cashflowType
      }
      nameInTeo
      tooltip
      visible
    }
  }
`;

export const projectKeyPerformanceIndicators = gql`
  query projectKeyPerformanceIndicators($projectId: Int!) {
    projectKeyPerformanceIndicators(projectId: $projectId) {
      id
      name
      asIs
      toBe
      completionFact
      date
      user {
        id
      }
      method
      resultDescription
      agreed
    }
  }
`;

export const usersOptions = gql`
  query tags {
    users {
      list {
        id
        displayName
      }
    }
  }
`;

export const factSpecificationForYear = gql`
  query factSpecificationForYear($projectId: Int!, $sppId: String!, $year: Int!, $directorateId: Int) {
    factOrdersSpecificationForYear(projectId: $projectId, sppId: $sppId, year: $year, directorateId: $directorateId) {
      moneyAmount
      description
      supplier
      date
      orderNumber
      contractNumber
      sapUser
    }
    factEntriesSpecificationForYear(projectId: $projectId, sppId: $sppId, year: $year, directorateId: $directorateId) {
      moneyAmount
      date
      type
    }
  }
`;

export const factSpecificationForMonth = gql`
  query factSpecificationForMonth($projectId: Int!, $sppId: String!, $period: DateTime!, $directorateId: Int) {
    factOrdersSpecificationForMonth(
      projectId: $projectId
      sppId: $sppId
      period: $period
      directorateId: $directorateId
    ) {
      moneyAmount
      description
      supplier
      date
      orderNumber
      contractNumber
      sapUser
    }
    factEntriesSpecificationForMonth(
      projectId: $projectId
      sppId: $sppId
      period: $period
      directorateId: $directorateId
    ) {
      moneyAmount
      date
      type
    }
  }
`;

export const analyticsFilterQuery = gql`
  query analyticsQuery {
    sppGroups: cashflowItems(types: [SPPGroup]) {
      id
      type
      subtype
      name
    }
    spp: cashflowItems(types: [SPP, PNL]) {
      id
      type
      subtype
      name
    }
    domains: projectDomains {
      id
      name
    }
    customerOptions: customerCategories {
      id
      name
      customer {
        id
        name
      }
    }
    approvalLevels: projectApprovalLevels {
      id
      name
    }
    effects: projectEffects {
      id
      name
    }
    capex: capexSubgroups {
      id
      name
      capexGroup {
        id
        name
      }
    }
  }
`;

export const dashboardTopFilters = gql`
  query filtersQuery {
    kinds: projectKinds {
      id
      name
    }
    directoratesBK: directoratesBK {
      id
      name
    }
    capex: capexSubgroups {
      capexGroup {
        id
        name
      }
    }
  }
`;

export const opexActivities = gql`
  query opexActivities(
    $page: Int
    $size: Int
    $detailed: Boolean
    $directorateId: Int
    $departmentId: Int
    $mvzCodes: [String!]
    $search: String
    $serviceIds: [Int!]
    $supplierIds: [String!]
    $responsibleId: Int
    $contractStartDateFrom: DateTime
    $contractStartDateTo: DateTime
    $contractEndDateFrom: DateTime
    $contractEndDateTo: DateTime
    $year: Int
  ) {
    opexActivitiesWithValues(
      page: $page
      size: $size
      detailed: $detailed
      directorateId: $directorateId
      departmentId: $departmentId
      mvzCodes: $mvzCodes
      search: $search
      serviceIds: $serviceIds
      supplierIds: $supplierIds
      responsibleId: $responsibleId
      contractStartDateFrom: $contractStartDateFrom
      contractStartDateTo: $contractStartDateTo
      contractEndDateFrom: $contractEndDateFrom
      contractEndDateTo: $contractEndDateTo
      year: $year
    ) {
      count
      list {
        id
        name
        mvzCode
        service {
          id
          name
          num
          type
        }
        responsible {
          id
          fullName
        }
        contractId
        directorateName
        departmentName
        comment
        valuesContainers {
          type
          sum
          values {
            period
            value
          }
        }
      }
    }
  }
`;

export const directoratesQuery = gql`
  query opexDirectorates {
    opexActivitiesDirectorates {
      id
      name
    }
  }
`;

export const opexActivitiesWithFields = gql`
  query opexActivityWithFields($activityId: Int!) {
    opexActivityWithFields(activityId: $activityId) {
      id
      name
      fields {
        name
        key
        type
        isEditable
        value
      }
    }
  }
`;

export const departmentsQuery = gql`
  query opexDepartments {
    opexActivitiesDepartments {
      id
      name
    }
  }
`;

export const activityCardOptions = gql`
  query activityCardOptions {
    opexActivitiesDictionaryValuesMap {
      groupOfExpenses
      subgroupOfExpenses
      rbpStatus
      cfo
      commitments
      costChangeDriver
    }
    mvz: opexActivitiesMVZ {
      name
      code
    }
  }
`;

export const mainAccounts = gql`
  query mainAccounts($page: Int, $search: String, $size: Int) {
    mainAccounts(page: $page, search: $search, size: $size) {
      list {
        id
        name
      }
    }
  }
`;

export const mvzQuery = gql`
  query opexMVZ {
    opexActivitiesMVZ {
      name
      code
    }
  }
`;

export const activitiesServicesQuery = gql`
  query opexActivitiesServices {
    opexActivitiesServices(usedInActivities: true) {
      list {
        id
        name
        num
        type
      }
      count
    }
  }
`;

export const getUsers = gql`
  query usersQuery($size: Int, $page: Int, $search: String) {
    users(size: $size, page: $page, search: $search) {
      list {
        id
        displayName
      }
    }
  }
`;

export const suppliersQuery = gql`
  query opexSuppliers {
    opexActivitiesSuppliers {
      id
      name
      inn
    }
  }
`;

export const opexActivitiesServices = gql`
  query opexActivitiesServices($page: Int, $search: String, $size: Int) {
    opexActivitiesServices(page: $page, search: $search, size: $size) {
      list {
        id
        name
        num
      }
    }
  }
`;

export const responsiblesQuery = gql`
  query opexResponsibles {
    opexActivitiesResponsibleList {
      id
      fullName
    }
  }
`;

export const activityContracts = gql`
  query activityContracts($page: Int, $search: String, $size: Int) {
    contracts(page: $page, search: $search, size: $size) {
      list {
        id
        startDate
        expirationDate
      }
    }
  }
`;

export const opexYearsQuery = gql`
  query opexYears {
    opexActivitiesYears
  }
`;

export const prkQuery = gql`
  query prkQuery($page: Int, $search: String, $size: Int) {
    prk(page: $page, search: $search, size: $size) {
      list {
        id
        name
      }
    }
  }
`;

export const groupsActivitiesWithMetrics = gql`
  query opexActivitiesGroupsYearMetrics($search: String, $responsibleIds: [Int!], $supplierIds: [String!], $year: Int) {
    groupsData: opexActivitiesGroupsYearMetrics(
      search: $search
      responsibleIds: $responsibleIds
      supplierIds: $supplierIds
      year: $year
    ) {
      groupId
      groupName
      isDefault
      activitiesAmount
      responsibleAmount
      originalBudget
      currentBudget
      obligo
      fact
      forecast
      balance
      delta
      byMonths {
        month
        originalBudget
        currentBudget
        fact
        forecast
        obligo
        delta
        balance
      }
    }
  }
`;

export const groupsMetricsByMonth = gql`
  query metrics($search: String, $responsibleIds: [Int!], $supplierIds: [String!], $year: Int) {
    graphicData: opexActivitiesGroupsMetricsByMonths(
      search: $search
      responsibleIds: $responsibleIds
      supplierIds: $supplierIds
      year: $year
    ) {
      month
      currentBudget
      originalBudget
      forecast
      obligo
      delta
      balance
      fact
    }
  }
`;

export const activitiesMetricsByMonth = gql`
  query metrics($search: String, $responsibleIds: [Int!], $supplierIds: [String!], $year: Int, $groupId: Int) {
    graphicData: opexActivitiesMetricsByMonths(
      search: $search
      responsibleIds: $responsibleIds
      supplierIds: $supplierIds
      year: $year
      groupId: $groupId
    ) {
      month
      currentBudget
      originalBudget
      forecast
      obligo
      delta
      balance
      fact
    }
  }
`;

export const groupsActivityTotal = gql`
  query opexActivitiesGroupsYearMetricsTotal(
    $search: String
    $responsibleIds: [Int!]
    $supplierIds: [String!]
    $year: Int
  ) {
    groupsData: opexActivitiesGroupsYearMetricsTotal(
      search: $search
      responsibleIds: $responsibleIds
      supplierIds: $supplierIds
      year: $year
    ) {
      originalBudget
      currentBudget
      obligo
      fact
      forecast
      balance
      delta
    }
  }
`;

export const activitiesTotal = gql`
  query opexActivitiesGroupYearMetrics(
    $search: String
    $responsibleIds: [Int!]
    $supplierIds: [String!]
    $year: Int
    $groupId: Int!
  ) {
    groupsData: opexActivitiesGroupYearMetrics(
      search: $search
      responsibleIds: $responsibleIds
      supplierIds: $supplierIds
      year: $year
      groupId: $groupId
    ) {
      originalBudget
      currentBudget
      obligo
      fact
      forecast
      balance
      delta
      groupId
      groupName
      isDefault
      activitiesAmount
      responsibleAmount
    }
  }
`;

export const activitiesWithMetrics = gql`
  query opexActivitiesYearMetrics(
    $search: String
    $responsibleIds: [Int!]
    $supplierIds: [String!]
    $year: Int
    $groupId: Int!
    $size: Int
    $page: Int
  ) {
    groupOfExpenses: opexActivitiesGroupOfExpenses(id: $groupId) {
      id
      name
    }
    groupsData: opexActivitiesYearMetrics(
      search: $search
      responsibleIds: $responsibleIds
      supplierIds: $supplierIds
      year: $year
      groupId: $groupId
      page: $page
      size: $size
    ) {
      originalBudget
      currentBudget
      obligo
      fact
      forecast
      balance
      delta
      activityId
      activityName
      responsible {
        id
        fullName
      }
      byMonths {
        month
        originalBudget
        currentBudget
        fact
        forecast
        obligo
        delta
        balance
      }
      supplierName
    }
  }
`;

export const activitiesWithMetricsTotal = gql`
  query opexActivitiesYearMetricsTotal(
    $search: String
    $responsibleIds: [Int!]
    $supplierIds: [String!]
    $year: Int
    $groupId: Int
    $size: Int
    $page: Int
  ) {
    groupsData: opexActivitiesYearMetrics(
      search: $search
      responsibleIds: $responsibleIds
      supplierIds: $supplierIds
      year: $year
      groupId: $groupId
      page: $page
      size: $size
    ) {
      originalBudget
      currentBudget
      obligo
      fact
      forecast
      balance
      delta
      activityId
      activityName
      responsible {
        id
        fullName
      }
      byMonths {
        month
        originalBudget
        currentBudget
        fact
        forecast
        obligo
        delta
        balance
      }
      supplierName
    }
  }
`;
