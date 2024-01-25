
using Microsoft.AspNetCore.Mvc;

using System.Text.Json;


namespace backend_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MovieController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private static List<string> _recentSearches = new List<string>();
    private readonly ILogger<MovieController> _logger;

    public MovieController(IHttpClientFactory httpClientFactory, ILogger<MovieController> logger)
    {
        _httpClient = httpClientFactory.CreateClient("OmdbApiClient");
        _logger = logger;
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchMovies([FromQuery] string title)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return BadRequest("Title cannot be null or empty.");
            }

            string apiKey = "befaa6a3";
            string apiUrl = $"http://www.omdbapi.com/?i=tt3896198&apikey={apiKey}&t={title}";

            var response = await _httpClient.GetStringAsync(apiUrl);
            using (JsonDocument document = JsonDocument.Parse(response))
            {
                return Ok(document.RootElement);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in SearchMovies");
            return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
        }
    }

     [HttpGet("recentsearches")]
    public IActionResult GetRecentSearches()
    {
        return Ok(_recentSearches);
    }

    [HttpPost("saverecentsearch")]
    public IActionResult SaveRecentSearch([FromBody] string searchQuery)
    {
        _recentSearches.Add(searchQuery);
        _recentSearches = _recentSearches.TakeLast(5).ToList();
        return Ok();
    }

    [HttpGet("moviedetails/{imdbId}")]
    public async Task<IActionResult> GetMovieDetails(string imdbId)
    {
        try
        {
            string apiKey = "befaa6a3";
            string apiUrl = $"http://www.omdbapi.com/?apikey={apiKey}&i={imdbId}";

            var response = await _httpClient.GetStringAsync(apiUrl);
             using (JsonDocument document = JsonDocument.Parse(response))
            {
                return Ok(document.RootElement);
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }
}