/**
 * Combined handlers for all mocked APIs.
 * Add handlers for more mocked APIs below
 */

import { exampleApiMockHandlers } from '@ddp-bot/example-api-mocks'

// Here you can turn on or off mocking on a per API level
const MOCK_EXAMPLE_API = 1

export const handlers = [...(MOCK_EXAMPLE_API ? exampleApiMockHandlers : [])]
