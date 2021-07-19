import { gql } from '@apollo/client';

export const saveForecastsMutation = gql`
  mutation saveForecasts($forecasts: [SaveForecastInput!]!) {
    saveForecasts(forecasts: $forecasts) {
      id
    }
  }
`;

export const createProjectMutation = gql`
  mutation createProject(
    $name: String!
    $projectRefId: Int
    $startDate: DateTime
    $finishDate: DateTime
    $tagIds: [Int!]
    $managerIds: [Int!]
    $participantIds: [Int!]
    $directorateIds: [Int!]
    $directorateBKId: Int
    $kindId: Int
    $portfolioId: Int
    $jiraLink: String
    $domainId: Int
    $approvalLevelId: Int
    $approvalDate: DateTime
    $effectId: Int
    $customerCategoryId: Int
    $capexSubgroupId: Int
  ) {
    createProject(
      project: {
        name: $name
        projectRefId: $projectRefId
        startDate: $startDate
        finishDate: $finishDate
        tagIds: $tagIds
        managerIds: $managerIds
        participantIds: $participantIds
        directorateIds: $directorateIds
        directorateBKId: $directorateBKId
        kindId: $kindId
        portfolioId: $portfolioId
        jiraLink: $jiraLink
        domainId: $domainId
        approvalLevelId: $approvalLevelId
        approvalDate: $approvalDate
        effectId: $effectId
        customerCategoryId: $customerCategoryId
        capexSubgroupId: $capexSubgroupId
      }
    ) {
      id
      projectRef {
        id
      }
      managers {
        id
      }
    }
  }
`;

export const updateProjectMutation = gql`
  mutation(
    $id: Int!
    $name: String
    $startDate: DateTime
    $finishDate: DateTime
    $projectRefId: Int
    $managerIds: [Int!]
    $participantIds: [Int!]
    $tagIds: [Int!]
    $directorateIds: [Int!]
    $directorateBKId: Int
    $kindId: Int
    $statusId: Int
    $portfolioId: Int
    $jiraLink: String
    $includeDirectorateBKInResult: Boolean!
    $domainId: Int
    $approvalLevelId: Int
    $approvalDate: DateTime
    $effectId: Int
    $customerCategoryId: Int
    $capexSubgroupId: Int
  ) {
    project: updateProject(
      project: {
        id: $id
        name: $name
        startDate: $startDate
        finishDate: $finishDate
        projectRefId: $projectRefId
        managerIds: $managerIds
        participantIds: $participantIds
        tagIds: $tagIds
        directorateIds: $directorateIds
        directorateBKId: $directorateBKId
        kindId: $kindId
        statusId: $statusId
        portfolioId: $portfolioId
        jiraLink: $jiraLink
        domainId: $domainId
        approvalLevelId: $approvalLevelId
        approvalDate: $approvalDate
        effectId: $effectId
        customerCategoryId: $customerCategoryId
        capexSubgroupId: $capexSubgroupId
      }
    ) {
      id
      startDate
      finishDate
      name
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
      managers {
        id
        displayName
      }
      participants {
        id
        displayName
      }
      sapProject {
        code
      }
      projectRef {
        id
      }
      tags {
        id
        name
      }
      directorates {
        id
        shortName
      }
      directorateBK @include(if: $includeDirectorateBKInResult) {
        id
        name
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
      }
      capexSubgroup {
        id
        name
      }
    }
  }
`;

export const updateForecastSPPGroupsMutation = gql`
  mutation updateForecastSPPGroups($forecastSPPGroups: [UpdateForecastSPPGroupsInput!]!) {
    updateForecastSPPGroups(forecastSPPGroups: $forecastSPPGroups)
  }
`;

export const createUserMutation = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
    }
  }
`;

export const updateUserMutation = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      displayName
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

export const deleteUserMutation = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(userId: $id)
  }
`;

export const createTag = gql`
  mutation createTag($name: String!) {
    option: createTag(name: $name) {
      id
      name
    }
  }
`;

export const createPortfolio = gql`
  mutation createPortfolio($name: String!) {
    option: createPortfolio(name: $name) {
      id
      name
    }
  }
`;

export const changePnLSettings = gql`
  mutation updatePnLItems($items: [UpdatePnLItemInput!]!) {
    updatePnLItems(items: $items)
  }
`;

export const changeTeoSettings = gql`
  mutation updateTeoParameters($params: UpdateTeoParametersInput!) {
    updateTeoParameters(params: $params)
  }
`;

export const changeWaccSettings = gql`
  mutation updateWACCValues($values: [UpdateWACCValueInput!]!) {
    updateWACCValues(values: $values)
  }
`;

export const saveProjectCommentMutation = gql`
  mutation saveProjectCommentMutation($id: Int!, $text: String!, $topicId: Int) {
    saveProjectComment(projectId: $id, text: $text, topicId: $topicId) {
      id
    }
  }
`;

export const editCommentMutation = gql`
  mutation editComment($text: String!, $id: Int!, $topicId: Int) {
    editComment(text: $text, id: $id, topicId: $topicId) {
      id
    }
  }
`;

export const deleteInitiativeMutation = gql`
  mutation deleteInitiative($id: Int!) {
    deleteInitiative(id: $id)
  }
`;

export const updateTeoCashflowItemsMutation = gql`
  mutation updateTeoCashflowItems($items: [UpdateTeoCashflowItemInput!]!) {
    updateTeoCashflowItems(items: $items)
  }
`;

export const saveTeoImpactPnL = gql`
  mutation saveTeoImpactPnL($teoImpactPnL: [SaveTeoImpactPnLInput!]!) {
    saveTeoImpactPnL(teoImpactPnL: $teoImpactPnL)
  }
`;

export const saveTeoExpensesMutation = gql`
  mutation saveTeoExpenses($expenses: [SaveTeoExpenseInput!]!) {
    saveTeoExpenses(expenses: $expenses)
  }
`;

export const createTeoMutation = gql`
  mutation createTeo($projectId: Int!) {
    createTeo(projectId: $projectId) {
      id
      agreed
    }
  }
`;

export const updateProjectTeoParametersMutation = gql`
  mutation updateProjectTeoParameters($teoId: Int!, $usefulLifeMonths: Int!, $investmentPeriodMonths: Int!) {
    updateProjectTeoParameters(
      teoId: $teoId
      usefulLifeMonths: $usefulLifeMonths
      investmentPeriodMonths: $investmentPeriodMonths
    )
  }
`;

export const updateTeoAgreed = gql`
  mutation toggleTeoAgreed($teoId: Int!, $agreed: Boolean!) {
    toggleTeoAgreed(teoId: $teoId, agreed: $agreed)
  }
`;

export const deleteTeoMutation = gql`
  mutation deleteTeo($id: Int!) {
    deleteTeo(id: $id)
  }
`;

export const createTeoCopyMutation = gql`
  mutation createTeoCopy($id: Int!, $addVersion: Boolean) {
    teoCopy: createTeoCopy(teoId: $id, addVersion: $addVersion) {
      id
    }
  }
`;

export const updateTeoFromCopyMutation = gql`
  mutation replaceCopyWithOriginalTeo($id: Int!) {
    replaceCopyWithOriginalTeo(copiedTeoId: $id) {
      id
    }
  }
`;

export const createKeyPerformanceIndicator = gql`
  mutation createKeyPerformanceIndicator($indicator: CreateKeyPerformanceIndicatorInput!) {
    createKeyPerformanceIndicator(indicator: $indicator) {
      id
    }
  }
`;

export const updateKeyPerformanceIndicator = gql`
  mutation updateKeyPerformanceIndicator($indicator: UpdateKeyPerformanceIndicatorInput!) {
    updateKeyPerformanceIndicator(indicator: $indicator) {
      id
    }
  }
`;

export const toggleKeyPerformanceIndicatorAgreed = gql`
  mutation toggleKeyPerformanceIndicatorAgreed($id: Int!, $agreed: Boolean!) {
    toggleKeyPerformanceIndicatorAgreed(id: $id, agreed: $agreed)
  }
`;

export const deleteKeyPerformanceIndicator = gql`
  mutation deleteKeyPerformanceIndicator($id: Int!) {
    deleteKeyPerformanceIndicator(id: $id)
  }
`;

export const unbindProjectFromInitiative = gql`
  mutation unbindProjectFromInitiative($projectId: Int!, $saveProjectTeo: Boolean, $saveProjectKpi: Boolean) {
    unbindProjectFromInitiative(
      projectId: $projectId
      saveProjectTeo: $saveProjectTeo
      saveProjectKpi: $saveProjectKpi
    ) {
      id
      startDate
      finishDate
      name
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
      managers {
        id
        displayName
      }
      sapProject {
        code
      }
      projectRef {
        id
      }
      tags {
        id
        name
      }
      directorates {
        id
        shortName
      }
      directorateBK {
        id
        name
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
      }
      capexSubgroup {
        id
        name
      }
    }
  }
`;

export const switchTeoViewMutation = gql`
  mutation switchTeoView($teoId: Int!, $newView: Boolean!) {
    switchTeoView(teoId: $teoId, newView: $newView)
  }
`;

export const saveOpexMutation = gql`
  mutation saveOpexActivitiesValues($values: [SaveOpexActivityValueInput!]!) {
    saveOpexActivitiesValues(values: $values)
  }
`;

export const saveActivity = gql`
  mutation saveOpexActivityFields($activityId: Int!, $fields: [SaveOpexActivityFieldInput!]!) {
    saveOpexActivityFields(activityId: $activityId, fields: $fields)
  }
`;

export const createActivityMutation = gql`
  mutation createOpexActivity($activity: CreateOpexActivityInput!) {
    createOpexActivity(activity: $activity) {
      id
    }
  }
`;

export const deleteActivityMutation = gql`
  mutation deleteActivity($activityId: Int!) {
    deleteOpexActivity(activityId: $activityId)
  }
`;
